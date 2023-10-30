import { addressRepo } from '../Repositories/addressRepository';
import { Address } from '../Entities/Address';
import { AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';

export const createAddress = async (addressRequestDTO: AddressRequestDTO) => {
    try {
        const save = await addressRepo.save(addressRequestDTO);
        return convertToDTO(save);
        
    } catch (error) {
        return error.message === 'Something went wrong!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getAddresses = async () => {
    try {
        const addresses = await addressRepo.find();
        const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));
        return addressDTOs;

    } catch (error) {
        return error.message === 'Couldn\'t find any addresses!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getAddressById = async (id: number) => {
    try {
        const response = await addressRepo.findOneByID(id);
        if (!response) {
            return { err: 'Invalid id' };
        }
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any addresses!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const updateAddress = async (addressDTO: AddressRequestDTO) => {
    try {
        if (!addressDTO) {
            return { err: 'Invalid address DTO!' };
        }
        const response = await addressRepo.save(addressDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any addresses!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const deleteAddress = async (addressId: number) => {
    try {
        if (!addressId) {
            return { err: 'Invalid address id!' };
        }
        const addressDB = await addressRepo.findOneByID(addressId);

        if (!addressDB) {
            return { err: 'Invalid Address' };
        }
        const response = await addressRepo.remove(addressDB);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any addresses!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
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