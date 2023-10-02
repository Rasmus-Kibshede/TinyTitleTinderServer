import { Request, Response } from 'express';
import * as userService from '../Services/userService';
import { User } from '../Entities/User';
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
	const user: User = {
		userId: req.body.user_id,
		email: req.body.email,
		password: req.body.password,
		userActive: req.body.user_active,
		createdAt: null,
		lastLogin: null,
		roles: null
	};
	const response = await userService.updateUser(user);
	res.send(response);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const response = await userService.deleteUserByID(Number(req.params.id));

	userRespone(response ? response : { err: response }, res, 201);
};


const userRespone = (response: User | { err: string }, res: Response, statusCode: number) => {
	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(statusCode).send(response);
	}
};