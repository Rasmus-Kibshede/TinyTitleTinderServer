import { locationRepo } from '../Repositories/locationRepository';
import { Location } from '../Entities/Location';
import { LocationRequestDTO, LocationResponseDTO } from '../DTO/locationDTO';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, ensureError } from '../Utils/errorHandler';

export const createLocation = async (locationRequestDTO: LocationRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const save = await locationRepo.save(locationRequestDTO);
        return convertToDTO(save);
        
    } catch (error) {
        return error.message === 'Something went wrong!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getLocations = async (): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const locations = await locationRepo.findAll();
        const locationDTOs: LocationResponseDTO[] = locations.map(location => convertToDTO(location));
        return locationDTOs;

    } catch (error) {
        return error.message === 'Couldent find any locations!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getLocationById = async (id: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await locationRepo.findOneByID(id);
        if (!response) {
            return { err: 'Invalid id' };
        }
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldent find any locations!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const updateLocation = async (locationDTO: LocationRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        if (!locationDTO) {
            return { err: 'Invalid location DTO!' };
        }
        const response = await locationRepo.save(locationDTO);
        return convertToDTO(response);

    } catch (error) {    
        return error.message === 'Couldent find any location!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const deleteLocation = async (locationId: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const locationDB = await locationRepo.findOneByID(locationId);

        if (!locationDB) {
            return { err: 'Invalid Location' };
        }
        const response = await locationRepo.remove(locationDB);
        return convertToDTO(response);

    } catch (error) {    
        return error.message === 'Couldent find any locations!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const convertToDTO = (location: Location) => {
    const dto: LocationResponseDTO = {
        locationId: location.locationId,
        country: location.country,
        addresses: location.addresses
    };
    return dto;
};