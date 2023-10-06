import { Request, Response } from 'express';
import * as userService from '../Services/userService';
import { UserDTO } from '../DTO/userDTO';

//TODO Dependency injection eller String med besked om hvilken db
//TODO TYPEORM.
//TODO DTO entity
//TODO Validering af data, så applikation ikke crasher
export const createUser = async (req: Request, res: Response) => {
	const userDTO: UserDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: null
	};
	const response = await userService.createUser(userDTO);
	res.send(response);
};

export const getUserByID = async (req: Request, res: Response) => {
	const response = await userService.getUserByID(Number(req.params.id));

	userRespone(response ? response : { err: response }, res, 200);
};

export const getAllUsers = async (req: Request, res: Response) => {
	const response = await userService.getUsers();
	res.send(response);
};

export const updateUser = async (req: Request, res: Response) => {
	//This is temp, as we will get id from JWT later on. 
	const id = req.body.user_id;

	const userRequestDTO: UserDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: req.body.roles
	};

	const response = await userService.updateUser(userRequestDTO, id);
	userRespone(response ? response : { err: response }, res, 201);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const response = await userService.deleteUserByID(Number(req.params.id));

	userRespone(response ? response : { err: response }, res, 201);
};


const userRespone = (response: UserDTO | { err: string }, res: Response, statusCode: number) => {
	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(statusCode).send(response);
	}
};