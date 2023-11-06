import { OriginRequestDTO } from '../DTO/originDTO';
import * as originService from '../Services/originService';
import { Request, Response } from 'express';

export const createOrigin = async (req: Request, res: Response) => {
    const originRequestDTO: OriginRequestDTO = {
        region: req.body.region,
        religion: req.body.religion,
        description: req.body.description,
        names: req.body.names
    };

    const response = await originService.createOrigin(originRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getOriginByID = async (req: Request, res: Response) => {
    const response = await originService.getOriginByID(Number(req.params.id));
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getAllOrigins = async (req: Request, res: Response) => {
    const response = await originService.getOrigins();
    
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
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

    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const deleteOrigin = async (req: Request, res: Response) => {
    const response = await originService.deleteOriginByID(Number(req.params.id));
    
    res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};
