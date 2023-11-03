import { addressRepo } from '../Repositories/addressRepository';
import { Address } from '../Entities/Address';
import { AddressRequestDTO, AddressResponseDTO } from '../DTO/addressDTO';
import { BaseError } from '../Utils/BaseError';

type Result<T, E extends BaseError = BaseError> = { success: true, result: T } | { success: false, error: E }

//skal sættes på som returtype i vores arrow functions. Hvis ikke, så er det vist nok vi bare retunere objektet. 

//Dette skal sættes på i hver metode


//Denne metode skal bruges til at wrappe alle errors eller potientielle Errors. Så vi er sikker på at alt der kommer op i 
//controller laget er en error som vi kan håndtere 
function ensureError(value: unknown): Error {
    if (value instanceof Error) return value;

    let stringified = '[Unable to stringify the thrown value]';
    try {
        stringified = JSON.stringify(value);
    } catch { /* empty */ }

    const error = new Error(`This value was thrown as is, not through an Error: ${stringified}`);
    return error;
}


export const createAddress = async (addressRequestDTO: AddressRequestDTO) => {
    
    try {
        const save = await addressRepo.save(addressRequestDTO);
       const dto = convertToDTO(save);
        return { success: true, dto};
    } catch (err) {
        const error = ensureError(err);
       // return { success: false, error };
        throw new BaseError('Could not log request', { cause: error, context: { dto.addressId, dto.address } });
    }



};

export const getAddresses = async () => {
    try {
        const addresses = await addressRepo.findAll();
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
        address: address.address,
        location: address.location
    };
    return dto;
};

