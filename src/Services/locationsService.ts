import { locationRepo } from '../Repositories/locationRepository';
import { Location } from '../Entities/Location';
import { LocationRequestDTO, LocationResponseDTO } from '../DTO/locationDTO';

export const createLocation = async (locationRequestDTO: LocationRequestDTO) => {
    try {
        const save = await locationRepo.save(locationRequestDTO);
        return convertToDTO(save);
        
    } catch (error) {
        return error.message === 'Something went wrong!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getLocations = async () => {
    try {
        const locations = await locationRepo.findAll();
        const locationDTOs: LocationResponseDTO[] = locations.map(location => convertToDTO(location));
        return locationDTOs;

    } catch (error) {
        return error.message === 'Couldent find any locations!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getLocationById = async (id: number) => {
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

export const updateLocation = async (locationDTO: LocationRequestDTO) => {
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

export const deleteLocation = async (locationId: number) => {
    try {
        const locationDB = await locationRepo.findOneByID(locationId);

        if (!locationDB) {
            return { err: 'Invalid Location' };
        }
        const response = await locationRepo.remove(locationDB);
        return convertToDTO(response);

    } catch (error) {
        console.log(error);
        
        return error.message === 'Couldent find any locations!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const convertToDTO = (location: Location) => {
    console.log(location);
    const dto: LocationResponseDTO = {
        locationId: location.locationId,
        country: location.country,
        addresses: location.addresses
    };
    return dto;
};