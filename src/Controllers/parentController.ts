import { Request, Response } from 'express';
import * as parentService from '../Services/parentService';
import * as responseController from '../Controllers/responseController';
import { ParentRequestDTO } from '../DTO/parentDTO';

export const createParent = async (req: Request, res: Response) => {
    let parentRequestDTO: ParentRequestDTO;
    if (!req.body.user) {
        parentRequestDTO = {
            age: req.body.age,
            gender: req.body.gender,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address
        };
    }
     parentRequestDTO = {
        age: req.body.age,
        gender: req.body.gender,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        user: req.body.user,
        address: req.body.address
    };

    const response = await parentService.createParent(parentRequestDTO);
    responseController.response(res, response, 200);
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
        parentId: req.body.id,
        age: req.body.age,
        gender: req.body.gender,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        user: req.body.user,
        address: req.body.address
    };
    const response = await parentService.updateParent(parentRequestDTO);
    responseController.response(res, response, 200);
};

export const deleteParent = async (req: Request, res: Response) => {
    const response = await parentService.deleteParent(Number(req.params.id));
    responseController.response(res, response, 204);
};
