import { Request, Response } from 'express';
import * as familyService from '../Services/familyService';
import { FamilyRequestDTO } from '../DTO/familyDTO';

export const createFamily = async (req: Request, res: Response) => {
    const familyRequestDTO: FamilyRequestDTO = {
        familyId: req.body.familyId,
        familyName: req.body.familyName,
        parents: req.body.parents
    };

    const response = await familyService.createFamily(familyRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
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
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const updateFamily = async (req: Request, res: Response) => {
    const familyRequestDTO: FamilyRequestDTO = {
        familyId: req.body.familyId,
        familyName: req.body.familyName,
        parents: req.body.parents
    };

    const response = await familyService.updateFamily(familyRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const deleteFamily = async (req: Request, res: Response) => {
    const response = await familyService.deleteFamily(Number(req.params.id));
    res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};