import { Request, Response } from 'express';
import * as familyService from '../Services/familyService';
import * as responseController from '../Controllers/responseController';
import { FamilyRequestDTO } from '../DTO/familyDTO';

export const createFamily = async (req: Request, res: Response) => {
    const familyRequestDTO: FamilyRequestDTO = {
        familyId: req.body.familyId,
        familyName: req.body.familyName,
        parents: req.body.parents
    };

    const response = await familyService.createFamily(familyRequestDTO);
    responseController.response(res, response, 200);
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
    responseController.response(res, response, 200);
};

export const updateFamily = async (req: Request, res: Response) => {
    const familyRequestDTO: FamilyRequestDTO = {
        familyId: req.body.familyId,
        familyName: req.body.familyName,
        parents: req.body.parents
    };

    const response = await familyService.updateFamily(familyRequestDTO);
    responseController.response(res, response, 200);
};

export const deleteFamily = async (req: Request, res: Response) => {
    const response = await familyService.deleteFamily(Number(req.params.id));
    responseController.response(res, response, 204);
};