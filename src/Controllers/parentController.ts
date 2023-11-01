import { Request, Response } from 'express';
import * as parentService from '../Services/parentService';
import { ParentRequestDTO, ParentResponseDTO } from '../DTO/parentDTO';

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
    parentResponse(response ? response : { err: response }, res, 201);
};

export const getAllParents = async (req: Request, res: Response) => {
    const response = await parentService.getParents();

    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(200).send(response);
    }
};

export const getParentById = async (req: Request, res: Response) => {
    const response = await parentService.getParentById(Number(req.params.id));
    parentResponse(response ? response : { err: response }, res, 201);
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
    parentResponse(response ? response : { err: response }, res, 201);
};

export const deleteParent = async (req: Request, res: Response) => {
    const response = await parentService.deleteParent(Number(req.params.id));
    parentResponse(response ? response : { err: response }, res, 201);
};

const parentResponse = (response: ParentResponseDTO | { err: string }, res: Response, statusCode: number) => {
    if (!response) {
        res.status(404).send({ err: response });
    } else {
        res.status(statusCode).send(response);
    }
};