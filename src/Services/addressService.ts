import { addressRepo } from '../Repositories/addressRepository';
import { Address } from '../Entities/Address';
import { AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, failed, generateStatusCode, invalidIdError } from '../Utils/errorHandler';

export const createAddress = async (addressRequestDTO: AddressRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await addressRepo.save(addressRequestDTO);
        return success(response);
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
    }
};

export const getAddresses = async (): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const addresses = await addressRepo.findAll();
        const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));
        return success(addressDTOs);
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
    }
};

export const getAddressById = async (id: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await addressRepo.findOneByID(id);
        if (!response) {
            return failed(invalidIdError('address'), await generateStatusCode(invalidIdError('address').message));
        }
        return success(response);
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.    
        return failed(err, await generateStatusCode(err.code));
    }
};

export const updateAddress = async (addressDTO: AddressRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await addressRepo.save(addressDTO);
        return success(response);
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
    }
};

export const deleteAddress = async (addressId: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const addressDB = await addressRepo.findOneByID(addressId);

        if (!addressDB) {
            return failed(invalidIdError('address'), await generateStatusCode(invalidIdError('address').message));
        }
        const response = await addressRepo.remove(addressDB);
        return success(response);
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        return failed(err, '404');
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

function success(response: Address | AddressResponseDTO[]): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
        return { success: true, result: { data: response } };
    } else {
        return { success: true, result: { data: convertToDTO(response) } };
    }
}
