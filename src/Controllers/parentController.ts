import { Request, Response } from 'express';
import * as parentService from '../Services/parentService'; 	
import { parentDTO } from '../DTO/parentDTO';

//TODO Dependency injection eller String med besked om hvilken db
//TODO TYPEORM.
//TODO DTO entity
//TODO Validering af data, så applikation ikke crasher
export const createParent = async (req: Request, res: Response) => {
	const parentDTO: ParentDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: null
	};
	const response = await parentService.createParent(parentDTO);
	res.send(response);
};

export const getParentByID = async (req: Request, res: Response) => {
	const response = await parentService.getParentByID(Number(req.params.id));

	userRespone(response ? response : { err: response }, res, 200);
};

export const getAllParents = async (req: Request, res: Response) => {
	const response = await parentService.getParents();
	res.send(response);
};

export const updateParent = async (req: Request, res: Response) => {
	//This is temp, as we will get id from JWT later on. 
	const id = req.body.parent_id;

	const parentRequestDTO: ParentDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: req.body.roles
	};

	const response = await parentService.updateParent(parentRequestDTO, id);
	userRespone(response ? response : { err: response }, res, 201);
};

export const deleteParentByID = async (req: Request, res: Response) => {
	const response = await parentService.deleteParentByID(Number(req.params.id));

	userRespone(response ? response : { err: response }, res, 201);
};

const parentRespone = (response: ParentDTO | { err: string }, res: Response, statusCode: number) => {
	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(statusCode).send(response);
	}
};