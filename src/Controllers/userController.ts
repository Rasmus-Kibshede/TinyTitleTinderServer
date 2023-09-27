import { Request, Response } from 'express';
import { getUserByID as getUser } from '../Services/userService';
import { createUser as newUser } from '../Services/userService';
import { User } from '../DTO/userDTO';

//TODO Dependency injection eller String med besked om hvilken db
//TODO TYPEORM.
//TODO DTO entity
//TODO Validering af data, så applikation ikke crasher
export const createUser = async (req: Request, res: Response) => {
	const user: User = {
		userId: -1,
		email: req.body.email,
		password: req.body.password,
		userActive: true,
		createdAt: '',
		lastLogin: '',
		role: null
	};
	const response = await newUser(user);
	res.send(response);
};

export const getUserByID = async (req: Request, res: Response) => {
	const response = await getUser(Number(req.params.id));
	res.send(response);
};
/*
export const getAllUsers = async (req: Request, res: Response) => {
	const response = await users();
	res.send(response);
};

export const updateUser = async (req: Request, res: Response) => {
	const user: User = {
		userId: req.body.user_id,
		email: req.body.email,
		password: req.body.password,
		userActive: true,
		createdAt: '',
		lastLogin: '',
		role: null
	};
	const response = await update(user);
	res.send(response);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const response = await deleteUser(Number(req.params.id));
	res.send(response);
};*/