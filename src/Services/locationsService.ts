import { locationRepo } from '../Repositories/locationRepository';
import { Location } from '../Entities/Location';
import { LocationRequestDTO, LocationResponseDTO } from '../DTO/locationDTO';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, failed } from '../Utils/errorHandler';

export const createLocation = async (locationRequestDTO: LocationRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await locationRepo.save(locationRequestDTO);
        return success(response);
        
    } catch (err) {
        return failed(err);
    }
};

export const getLocations = async (): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const locations = await locationRepo.findAll();
        const locationDTOs: LocationResponseDTO[] = locations.map(location => convertToDTO(location));
        return success(locationDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const getLocationById = async (id: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await locationRepo.findOneByID(id);
        if (!response) {
            return failed('location');
        }
        return success(response);

    } catch (err) {
        return failed(err);
    }
};

export const updateLocation = async (locationDTO: LocationRequestDTO): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const response = await locationRepo.save(locationDTO);
        return success(response);

    } catch (err) {    
        return failed(err);
    }
};

export const deleteLocation = async (locationId: number): Promise<Result<ApiResponse, BaseError>> => {
    try {
        const locationDB = await locationRepo.findOneByID(locationId);

        if (!locationDB) {
            return failed('location');
        }
        const response = await locationRepo.remove(locationDB);
        return success(response);

    } catch (err) {    
        return failed(err);
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

function success(response: Location | LocationResponseDTO[]): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
        return { success: true, result: { data: response } };
    } else {
        return { success: true, result: { data: convertToDTO(response) } };
    }
}