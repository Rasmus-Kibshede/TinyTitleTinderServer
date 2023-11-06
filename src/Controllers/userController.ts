import { Request, Response } from 'express';
import * as userService from '../Services/userService';
import { UserRequestDTO } from '../DTO/userDTO';

//TODO Dependency injection eller String med besked om hvilken db
//TODO Validering af data, så applikation ikke crasher.
export const createUser = async (req: Request, res: Response) => {
	const UserRequestDTO: UserRequestDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: null
	};
	const response = await userService.createUser(UserRequestDTO);
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getUserByID = async (req: Request, res: Response) => {
	const response = await userService.getUserByID(Number(req.params.id));
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const getAllUsers = async (req: Request, res: Response) => {
	const response = await userService.getUsers();
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

//TODO Denne kan ikke tage imod rolle uden at opdatere email, crasher appen.
export const updateUser = async (req: Request, res: Response) => {
	const userRequestDTO: UserRequestDTO = {
		email: req.body.newEmail,
		password: req.body.password,
		roles: req.body.roles
	};
	const response = await userService.updateUser(userRequestDTO, req.body.email);
	res.status(response.success ? 200 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const response = await userService.deleteUserByID(Number(req.params.id));
	res.status(response.success ? 204 : Number(response.error.statusCode)).send(response.success ? response.result.data : response.error.message);
};