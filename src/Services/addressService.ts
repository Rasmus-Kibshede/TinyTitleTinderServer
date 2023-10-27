import { addressRepo } from '../Repositories/addressRepository';
import { Address } from '../Entities/Address';
import { AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';

export const createAddress = async (addressRequestDTO: AddressRequestDTO) => {
    try{
        const save = await addressRepo.save(addressRequestDTO);
        return convertToDTO(save);
    } catch(err){
        return err.message === 'Something went wrong!' ? {err: err.message} : {err: 'Something went wrong!- we are working on it!'};
    }
};

export const convertToDTO = (address: Address) => {
    const dto: AddressResponseDTO = {
        city: address.city,
        zipcode: address.zipcode,
        address: address.address
    };
    return dto; 
};

export const getAddresses = async () => {
    const addresses = await addressRepo.find();    
    const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));    
    return addressDTOs;
};