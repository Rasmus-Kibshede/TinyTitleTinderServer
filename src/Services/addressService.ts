import { addressRepo } from '../Repositories/addressRepository';
import { Address } from '../Entities/Address';
import { AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';
import { failed, success } from '../Utils/errorHandler';

export const createAddress = async (addressRequestDTO: AddressRequestDTO) => {
    try {
        const response = await addressRepo.save(addressRequestDTO);
        return success(convertToDTO(response));
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err);
    }
};

export const getAddresses = async () => {
    try {
        const addresses = await addressRepo.findAll();
        const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));
        return success(addressDTOs);
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err);
    }
};

export const getAddressById = async (id: number) => {
    try {
        const response = await addressRepo.findOneByID(id);
        if (!response) {
            return failed('address');
        }
        return success(convertToDTO(response));
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.    
        return failed(err);
    }
};

export const updateAddress = async (addressDTO: AddressRequestDTO) => {
    try {
        const response = await addressRepo.save(addressDTO);
        return success(convertToDTO(response));
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err);
    }
};

export const deleteAddress = async (addressId: number) => {
    try {
        const addressDB = await addressRepo.findOneByID(addressId);

        if (!addressDB) {
            return failed('address');
        }
        const response = await addressRepo.remove(addressDB);
        return success(convertToDTO(response));
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err);
    }
};

export const convertToDTO = (address: Address) => {
    const dto: AddressResponseDTO = {
        addressId: address.addressId,
        city: address.city,
        zipcode: address.zipcode,
        address: address.address,
        location: address.location
    };
    return dto;
};
