import { locationRepo } from '../Repositories/locationRepository';
import { Location } from '../Entities/Location';
import { LocationRequestDTO, LocationResponseDTO } from '../DTO/locationDTO';
import { failed, success } from '../Utils/errorHandler';

export const createLocation = async (locationRequestDTO: LocationRequestDTO) => {
    try {
        const response = await locationRepo.save(locationRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getLocations = async () => {
    try {
        const locations = await locationRepo.findAll();
        const locationDTOs: LocationResponseDTO[] = locations.map(location => convertToDTO(location));
        return success(locationDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const getLocationById = async (id: number) => {
    try {
        const response = await locationRepo.findOneByID(id);
        if (!response) {
            return failed('location');
        }
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const updateLocation = async (locationDTO: LocationRequestDTO) => {
    try {
        const response = await locationRepo.save(locationDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const deleteLocation = async (locationId: number) => {
    try {
        const locationDB = await locationRepo.findOneByID(locationId);

        if (!locationDB) {
            return failed('location');
        }
        const response = await locationRepo.remove(locationDB);
        return success(convertToDTO(response));

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

