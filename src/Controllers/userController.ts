import { Request, Response } from 'express';
import * as userService from '../Services/userService';
import { UserRequestDTO, UserResponseDTO } from '../DTO/userDTO';

//TODO Dependency injection eller String med besked om hvilken db
//TODO Validering af data, så applikation ikke crasher.
export const createUser = async (req: Request, res: Response) => {
	const UserRequestDTO: UserRequestDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: null
	};
	const response = await userService.createUser(UserRequestDTO);
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

//TODO Denne kan ikke tage imod rolle uden at opdatere email, crasher appen.
export const updateUser = async (req: Request, res: Response) => {

	const userRequestDTO: UserRequestDTO = {
		email: req.body.newEmail,
		password: req.body.password,
		roles: req.body.roles
	};

	const response = await userService.updateUser(userRequestDTO, req.body.email);
	userRespone(response ? response : { err: response }, res, 201);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const response = await userService.deleteUserByID(Number(req.params.id));

	userRespone(response ? response : { err: response }, res, 201);
};

const userRespone = (response: UserResponseDTO | { err: string }, res: Response, statusCode: number) => {
	if (!response) {
		res.status(404).send({ err: response });
	} else {
		res.status(statusCode).send(response);
	}
};