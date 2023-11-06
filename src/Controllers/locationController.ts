import { Request, Response } from 'express';
import * as locationService from '../Services/locationService';
import { LocationRequestDTO } from '../DTO/locationDTO';

export const createLocation = async (req: Request, res: Response) => {
    const locationRequestDTO: LocationRequestDTO = {
        country: req.body.country,
        addresses: req.body.address
    };

    const response = await locationService.createLocation(locationRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getAllLocations = async (req: Request, res: Response) => {
    const response = await locationService.getLocations();
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getLocationById = async (req: Request, res: Response) => {
    const response = await locationService.getLocationById(Number(req.params.id));
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const updateLocation = async (req: Request, res: Response) => {
    const locationRequestDTO: LocationRequestDTO = {
        locationId: req.body.locationId,
        country: req.body.country,
        addresses: req.body.addresses
    };
    
    const response = await locationService.updateLocation(locationRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

//TODO Look at constraint, can't delete location if address is connected. 
export const deleteLocation = async (req: Request, res: Response) => {
    const response = await locationService.deleteLocation(Number(req.params.id));
    res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};
