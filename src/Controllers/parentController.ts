import { Request, Response } from 'express';
import * as parentService from '../Services/parentService';
import { ParentRequestDTO } from '../DTO/parentDTO';

export const createParent = async (req: Request, res: Response) => {
    let parentRequestDTO: ParentRequestDTO;
    if (!req.body.user) {
        parentRequestDTO = {
            age: req.body.age,
            gender: req.body.gender,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        };
    }
     parentRequestDTO = {
        age: req.body.age,
        gender: req.body.gender,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        user: req.body.user
    };

    const response = await parentService.createParent(parentRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getAllParents = async (req: Request, res: Response) => {
    const response = await parentService.getParents();

    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getParentById = async (req: Request, res: Response) => {
    const response = await parentService.getParentById(Number(req.params.id));
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const updateParent = async (req: Request, res: Response) => {
    const parentRequestDTO: ParentRequestDTO = {
        parentId: req.body.id,
        age: req.body.age,
        gender: req.body.gender,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        user: req.body.user
    };

    const response = await parentService.updateParent(parentRequestDTO);
    res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const deleteParent = async (req: Request, res: Response) => {
    const response = await parentService.deleteParent(Number(req.params.id));
    res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};
