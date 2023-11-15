import { Request, Response } from 'express';
import * as userService from '../Services/userService';
import * as responseController from '../Controllers/responseController';
import { UserRequestDTO } from '../DTO/userDTO';
import { ParentRequestDTO } from '../DTO/parentDTO';

//TODO Dependency injection eller String med besked om hvilken db
//TODO Validering af data, så applikation ikke crasher.
export const createUser = async (req: Request, res: Response) => {
	const UserRequestDTO: UserRequestDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: null
	};
	const response = await userService.createUser(UserRequestDTO);
	responseController.response(res, response, 200);
};

export const signUp = async (req: Request, res: Response) => {
	/*
	"email": "test@mail.com",
    "password": "1234dsadsagas",
    "age": 31,
	"gender": "male",
	"firstName": "2 kald database", 
	"lastName": "dette burde virke"
	*/
	const parentRequestDTO: ParentRequestDTO = {
		age: req.body.age,
		gender: req.body.gender,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};
	const userRequestDTO: UserRequestDTO = {
		email: req.body.email,
		password: req.body.password,
		roles: null,
		parent: parentRequestDTO
	};


	const response = await userService.signUp(userRequestDTO);
	responseController.response(res, response, 200);
};

export const getUserByID = async (req: Request, res: Response) => {
	const response = await userService.getUserByID(Number(req.params.id));
	responseController.response(res, response, 200);
};

export const getAllUsers = async (req: Request, res: Response) => {
	const response = await userService.getUsers();
	responseController.response(res, response, 200);
};

//TODO Denne kan ikke tage imod rolle uden at opdatere email, crasher appen.
export const updateUser = async (req: Request, res: Response) => {
	const userRequestDTO: UserRequestDTO = {
		email: req.body.newEmail,
		password: req.body.password,
		roles: req.body.roles
	};
	const response = await userService.updateUser(userRequestDTO, req.body.email);
	responseController.response(res, response, 200);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const response = await userService.deleteUserByID(Number(req.params.id));
	responseController.response(res, response, 204);
};