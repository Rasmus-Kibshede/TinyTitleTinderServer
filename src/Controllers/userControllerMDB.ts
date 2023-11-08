import { UserRequestDTOMDB } from '../DTO/userDTOMDB';
import * as userServiceMDB from '../Services/userServiceMDB';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
	const UserRequestDTO: UserRequestDTOMDB = {
		email: req.body.email,
		password: req.body.password,
		roles: req.body.roles,
		parent: req.body.parent
	};
	const response = await userServiceMDB.createUser(UserRequestDTO);
	res.send(response);
};

export const getAllUsers = async (req: Request, res: Response) => {
	const response = await userServiceMDB.getUsers();
	res.send(response);
};

//TODO: Get user by email currently throws user not found
export const getUserByEmail = async (req: Request, res: Response) => {
	const response = await userServiceMDB.getUserByEmail(req.params.email);

	res.send(response);
};

//TODO: Update user by email currently throws user not found
export const updateUser = async (req: Request, res: Response) => {

	const userRequestDTO: UserRequestDTOMDB = {
		email: req.body.newEmail,
		password: req.body.password,
		roles: req.body.roles,
		parent: req.body.parent
	};

	const response = await userServiceMDB.updateUser(userRequestDTO, req.body.email);
	res.send(response);
};

//TODO: Delete user by email currently throws user not found
export const deleteUserByEmail = async (req: Request, res: Response) => {
	const response = await userServiceMDB.deleteUserByEmail(req.params.email);

	res.send(response);
};