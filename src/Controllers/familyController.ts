import { Request, Response } from 'express';
import * as familyService from '../Services/familyService';
import { FamilyRequestDTO, FamilyResponseDTO } from '../DTO/familyDTO';

export const createFamily = async (req: Request, res: Response) => {
    const familyRequestDTO: FamilyRequestDTO = {
        familyId: req.body.familyId,
        familyName: req.body.familyName,
        parents: req.body.parents
    };

    const response = await familyService.createFamily(familyRequestDTO);
    familyResponse(response ? response : { err: response }, res, 201);
};

export const getAllFamilies = async (req: Request, res: Response) => {
    const response = await familyService.getFamilies();

    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(200).send(response);
    }
};

export const getFamilyById = async (req: Request, res: Response) => {
    const response = await familyService.getFamilyById(Number(req.params.id));
    familyResponse(response ? response : { err: response }, res, 201);
};

export const updateFamily = async (req: Request, res: Response) => {
    const familyRequestDTO: FamilyRequestDTO = {
        familyId: req.body.familyId,
        familyName: req.body.familyName,
        parents: req.body.parents
    };

    const response = await familyService.updateFamily(familyRequestDTO);
    familyResponse(response ? response : { err: response }, res, 201);
};

export const deleteFamily = async (req: Request, res: Response) => {
    const response = await familyService.deleteFamily(Number(req.params.id));
    familyResponse(response ? response : { err: response }, res, 201);
};

const familyResponse = (response: FamilyResponseDTO | { err: string }, res: Response, statusCode: number) => {
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(statusCode).send(response);
    }
};