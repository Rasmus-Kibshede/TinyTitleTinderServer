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

export const getAddresses = async () => {
    const addresses = await addressRepo.find();    
    const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));    
    return addressDTOs;
};

export const getAddressById = async (id: number) => {
    const response = await addressRepo.findOneById(id);
    if( !response) {
        return{err: 'Address not found!'};
    }
    return convertToDTO(response);
};

export const updateAddress = async (addressDTO: AddressRequestDTO) => {
    if(!addressDTO){
        return{err: 'Invalid address DTO!'};
    }
    const addressDB = await addressRepo.findOneBy(addressDTO);
    if(!addressDB){
        return await createAddress(addressDTO);
    }
    // TODO update on parent 
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