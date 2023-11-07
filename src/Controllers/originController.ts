import { OriginRequestDTO } from '../DTO/originDTO';
import * as originService from '../Services/originService';
import * as responseController from '../Controllers/responseController';
import { Request, Response } from 'express';

export const createOrigin = async (req: Request, res: Response) => {
    const originRequestDTO: OriginRequestDTO = {
        region: req.body.region,
        religion: req.body.religion,
        description: req.body.description,
        names: req.body.names
    };

    const response = await originService.createOrigin(originRequestDTO);
    responseController.response(res, response, 200);
};

export const getOriginByID = async (req: Request, res: Response) => {
    const response = await originService.getOriginByID(Number(req.params.id));
    responseController.response(res, response, 200);
};

export const getAllOrigins = async (req: Request, res: Response) => {
    const response = await originService.getOrigins();
    responseController.response(res, response, 200);
};

export const updateOrigin = async (req: Request, res: Response) => {
    const originRequestDTO: OriginRequestDTO = {
        originId: req.body.originId,
        region: req.body.region,
        religion: req.body.religion,
        description: req.body.description,
        names: req.body.names
    };
    const response = await originService.updateOrigin(originRequestDTO);
    responseController.response(res, response, 200);
};

export const deleteOrigin = async (req: Request, res: Response) => {
    const response = await originService.deleteOriginByID(Number(req.params.id));
    responseController.response(res, response, 204);
};
