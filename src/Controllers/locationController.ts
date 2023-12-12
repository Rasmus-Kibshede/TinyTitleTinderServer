import { Request, Response } from 'express';
import * as locationService from '../Services/locationService';
import * as responseController from '../Controllers/responseController';
import { LocationRequestDTO } from '../DTO/locationDTO';

export const createLocation = async (req: Request, res: Response) => {
    const locationRequestDTO: LocationRequestDTO = {
        country: req.body.country,
    };

    const response = await locationService.createLocation(locationRequestDTO);
    responseController.response(res, response, 201);
};

export const getAllLocations = async (req: Request, res: Response) => {
    const response = await locationService.getLocations();
    responseController.response(res, response, 200);
};

export const getLocationById = async (req: Request, res: Response) => {
    const response = await locationService.getLocationById(Number(req.params.id));
    responseController.response(res, response, 200);
};

export const updateLocation = async (req: Request, res: Response) => {
    const locationRequestDTO: LocationRequestDTO = {
        locationId: req.body.locationId,
        country: req.body.country,
    };
    
    const response = await locationService.updateLocation(locationRequestDTO);
    responseController.response(res, response, 200);
};

//TODO Look at constraint, can't delete location if address is connected. 
export const deleteLocation = async (req: Request, res: Response) => {
    const response = await locationService.deleteLocation(Number(req.params.id));
    responseController.response(res, response, 204);
};
