import { Request, Response } from 'express';
import { getUserByID as getUser } from '../service/userService';

export const getUserByID = async (req: Request, res: Response) => {
	const response = await getUser(Number(req.params.id));
	console.log(response);
	res.send(response);
};