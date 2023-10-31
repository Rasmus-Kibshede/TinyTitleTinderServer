import { OriginRequestDTO, OriginResponseDTO } from '../DTO/originDTO';
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
    originResponse(response ? response : { err: response }, res, 201);
};

export const getOriginByID = async (req: Request, res: Response) => {
    const response = await originService.getOriginByID(Number(req.params.id));
    originResponse(response ? response : { err: response }, res, 200);
};

export const getAllOrigins = async (req: Request, res: Response) => {
    const response = await originService.getOrigins();
    
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(200).send(response);
    }
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

    originResponse(response ? response : { err: response }, res, 201);
};

export const deleteOrigin = async (req: Request, res: Response) => {
    const response = await originService.deleteOriginByID(Number(req.params.id));
    
    originResponse(response ? response : { err: response }, res, 200);
};

const originResponse = (response: OriginResponseDTO | { err: string }, res: Response, statusCode: number) => {
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(statusCode).send(response);
    }
};