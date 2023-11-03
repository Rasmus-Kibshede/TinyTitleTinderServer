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
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            context: 404
        })};
    }
};

export const getAddresses = async () => {
    try {
        const addresses = await addressRepo.findAll();
        const addressDTOs: AddressResponseDTO[] = addresses.map(address => convertToDTO(address));
        return { success: true, result:{data: addressDTOs}};

    } catch (err) {
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not create address', {
            error: error, 
            context: 'placeholder for object'
        })};
    }
};

export const getAddressById = async (id: number) => {
    try {
        const response = await addressRepo.findOneByID(id);
        if (!response) {
            return { err: 'Invalid id' };
        }
        return { success: true, result:{data: convertToDTO(response)}};

    } catch (err) {
        const error = ensureError(err);
        return { success: false, error: new BaseError('Could not get address with that id', {
            error: error, 
            //her kan vi indsætte årsagen til error, ved at prikke os ind i error objektet. 
            //Alternativt kan vi kalde på en metode som har fejlkoder i sig som tjekker hvorfor error er sket og indsætter korrekt fejlkode. 
            context: 404
        })};
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
        address: address.address,
        location: address.location
    };
    return dto;
};

