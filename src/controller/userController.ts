import { Request, Response } from 'express';
import { getUserByID as getUser } from '../service/userService';
import { getUsers as users} from '../service/userService';


export const getUserByID = async (req: Request, res: Response) => {
	const response = await getUser(Number(req.params.id));
	res.send(response);
};

export const getAllUsers = async (req: Request, res: Response) => {
	const response = await users();
	res.send(response);
};