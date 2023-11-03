import { addressRepo } from '../Repositories/addressRepository';
import { Address } from '../Entities/Address';
import { AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, ensureError } from '../Utils/errorHandler';

export const createAddress = async (addressRequestDTO: AddressRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const save = await addressRepo.save(addressRequestDTO);
        const dto = convertToDTO(save);
        return { success: true, result:{data: dto}};
    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const getAddresses = async (): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const addresses = await addressRepo.findAll();
        const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));
        return { success: true, result:{data: addressDTOs}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const getAddressById = async (id: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await addressRepo.findOneByID(id);
        if (!response) {
            return { success: false, error: new BaseError('Could not get address', {
                error: new Error('Couldent find address with that id.'), 
                statusCode: 404
            })};
        }
        return { success: true, result:{data: convertToDTO(response)}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
    };

export const updateAddress = async (addressDTO: AddressRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        if (!addressDTO) {
            return { success: false, error: new BaseError('Could not update address', {
                error: new Error('insert some manual error here.'), 
                statusCode: 404
            })};
        }
        const response = await addressRepo.save(addressDTO);
        return { success: true, result:{data: response}};

    } catch (err) {
        //TODO Add custom message for each endpoint
        //TODO Add dynamic statuscode from the ErrorType.
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            statusCode: 404
        })};
    }
};

export const deleteAddress = async (addressId: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const addressDB = await addressRepo.findOneByID(addressId);

        if (!addressDB) {
            return { success: false, error: new BaseError('Could not delete address', {
                error: new Error('No address with that id.'), 
                statusCode: 404
            })};
        }
        const response = await addressRepo.remove(addressDB);
        return { success: true, result:{data: convertToDTO(response)}};

    } catch (err) {
       //TODO Add custom message for each endpoint
       //TODO Add dynamic statuscode from the ErrorType.
       const error = ensureError(err);
       return { success: false, error: new BaseError('Could not create address', {
           error: error, 
           statusCode: 404
       })};
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

