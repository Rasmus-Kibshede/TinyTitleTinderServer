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
    console.log('In UdpateAdress method');

    if (!addressDTO) {
        return { err: 'Invalid address DTO!' };
    }

    /*const response = await addressRepo.update({}, {
        addressId: addressDTO.addressId,
        city: addressDTO.city,
        zipcode: addressDTO.zipcode,
        address: addressDTO.address
    });*/
    //const response = await addressRepo.save(addressDTO);
   /* const response = await addressRepo.update({ addressId: addressDTO.addressId },
        {
            city: addressDTO.city,
            zipcode: addressDTO.zipcode,
            address: addressDTO.address
        }).then(response => response.raw[0]);
      */  
    return convertToDTO(addressDTO);
};

export const convertToDTO = (address: Address) => {
    console.log(address);
    
    const dto: AddressResponseDTO = {
        addressId: address.addressId,
        city: address.city,
        zipcode: address.zipcode,
        address: address.address
    };
    console.log(dto);
    
    return dto;
};