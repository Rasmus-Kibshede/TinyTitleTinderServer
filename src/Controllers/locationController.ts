import { Request, Response } from 'express';
import * as locationService from '../Services/locationsService';
import { LocationRequestDTO, LocationResponseDTO } from '../DTO/locationDTO';

export const createLocation = async (req: Request, res: Response) => {
    const locationRequestDTO: LocationRequestDTO = {
        country: req.body.country,
        addresses: req.body.address
    };

    const response = await locationService.createLocation(locationRequestDTO);
    locationResponse(response ? response : { err: response }, res, 200);
};

export const getAllLocations = async (req: Request, res: Response) => {
    const response = await locationService.getLocations();
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(201).send(response);
    }
};

export const getLocationById = async (req: Request, res: Response) => {
    const response = await locationService.getLocationById(Number(req.params.id));
    locationResponse(response ? response : { err: response }, res, 200);
};

export const updateLocation = async (req: Request, res: Response) => {
    const locationRequestDTO: LocationRequestDTO = {
        locationId: req.body.locationId,
        country: req.body.country,
        addresses: req.body.addresses
    };
    
    const response = await locationService.updateLocation(locationRequestDTO);
    locationResponse(response ? response : { err: response }, res, 201);
};

//TODO Look at constraint, can't delete location if address is connected. 
export const deleteLocation = async (req: Request, res: Response) => {
    const response = await locationService.deleteLocation(Number(req.params.id));
    locationResponse(response ? response : { err: response }, res, 201);
};

const locationResponse = (response: LocationResponseDTO | { err: string }, res: Response, statusCode: number) => {
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(statusCode).send(response);
    }
};