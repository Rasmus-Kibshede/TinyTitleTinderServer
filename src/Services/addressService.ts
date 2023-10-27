import { addressRepo } from '../Repositories/addressRepository';
import { Address } from '../Entities/Address';
import { AddressRequest2DTO, AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';

export const createAddress = async (addressRequestDTO: AddressRequest2DTO) => {
    try {
        const save = await addressRepo.save(addressRequestDTO);
        return convertToDTO(save);
    } catch (err) {
        return err.message === 'Something went wrong!' ? { err: err.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getAddresses = async () => {
    const addresses = await addressRepo.find();
    const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));
    return addressDTOs;
};

export const getAddressById = async (id: number) => {
    const response = await addressRepo.findOneById(id);
    if (!response) {
        return { err: 'Address not found!' };
    }
    return convertToDTO(response);
};

export const updateAddress = async (addressDTO: AddressRequestDTO) => {
    if (!addressDTO) {
        return { err: 'Invalid address DTO!' };
    }
    const addressDB = await addressRepo.findOneById(addressDTO.addressId);
    if(!addressDB){
        return { err: 'Address not found!' };
    }
    
    const response = await addressRepo.update(addressDB, addressDTO);

    return convertToDTO(response);
};

export const convertToDTO = (address: Address) => {
    const dto: AddressResponseDTO = {
        addressId: address.addressId,
        city: address.city,
        zipcode: address.zipcode,
        address: address.address
    };
    return dto;
};