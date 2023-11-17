import { UserRequestDTOMDB } from '../DTO/userDTOMDB';
import * as userServiceMDB from '../Services/userServiceMDB';
import { Request, Response } from 'express';
import * as responseController from '../Controllers/responseController';

export const createUser = async (req: Request, res: Response) => {
	const UserRequestDTO: UserRequestDTOMDB = {
		email: req.body.email,
		password: req.body.password,
		roles: req.body.roles,
	};
	const response = await userServiceMDB.createUser(UserRequestDTO);
	responseController.response(res, response, 201);
};

export const getAllUsers = async (req: Request, res: Response) => {
	const response = await userServiceMDB.getUsers();
	responseController.response(res, response, 200);
};

export const getUserByEmail = async (req: Request, res: Response) => {
	const response = await userServiceMDB.getUserByEmail(req.params.email);

	responseController.response(res, response, 200);
};


export const updateUser = async (req: Request, res: Response) => {
	const userRequestDTO: UserRequestDTOMDB = {
		email: req.body.newEmail,
		password: req.body.password,
		roles: req.body.roles,
	};

	const response = await userServiceMDB.updateUser(userRequestDTO, req.body.email);
	responseController.response(res, response, 200);
};


export const deleteUserByEmail = async (req: Request, res: Response) => {
	const response = await userServiceMDB.deleteUserByEmail(req.params.email);

	responseController.response(res, response, 204);
};