import { Request, Response } from 'express';
import * as parentService from '../Services/parentService';
import * as responseController from '../Controllers/responseController';
import { ParentRequestDTO } from '../DTO/parentDTO';

// TODO: Skal families ikke kunne addes til en parent i create og update?
export const createParent = async (req: Request, res: Response) => {
    const parentRequestDTO: ParentRequestDTO = {
        age: req.body.age,
        gender: req.body.gender,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        families: req.body.families,
        address: req.body.address,
     };

    const response = await parentService.createParent(parentRequestDTO);
    responseController.response(res, response, 201);
};

export const getAllParents = async (req: Request, res: Response) => {
    const response = await parentService.getParents();
    responseController.response(res, response, 200);
};

export const getParentById = async (req: Request, res: Response) => {
    const response = await parentService.getParentById(Number(req.params.id));
    responseController.response(res, response, 200);
};

export const updateParent = async (req: Request, res: Response) => {
    const parentRequestDTO: ParentRequestDTO = {
        parentId: req.body.parentId,
        age: req.body.age,
        gender: req.body.gender,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        likedNames: req.body.likedNames,
        dislikedNames: req.body.dislikedNames,
        families: req.body.families,
        address: req.body.address
    };
    
    const response = await parentService.updateParent(parentRequestDTO);
    responseController.response(res, response, 200);
};

export const deleteParent = async (req: Request, res: Response) => {
    const response = await parentService.deleteParent(Number(req.params.id));
    responseController.response(res, response, 204);
};

export const updateTablesForName = async (req: Request, res: Response) => {
    const response = await parentService.updateTablesForName(Number(req.params.id), req.body.likedNames, req.body.dislikedNames);
    responseController.response(res, response, 200);
};
