import { Request, Response } from 'express';
import { getUserByID as getUser } from '../service/userService';
import { getUsers as users } from '../service/userService';
import { deleteUserByID as deleteUser } from '../service/userService';
import { createUser as newUser } from '../service/userService';
import { User } from '../model/user';

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

export const getAllUsers = async (req: Request, res: Response) => {
	const response = await users();
	res.send(response);
};

export const deleteUserByID = async (req: Request, res: Response) => {
	const response = await deleteUser(Number(req.params.id));
	res.send(response);
};