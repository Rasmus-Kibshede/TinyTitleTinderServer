import * as userServiceMDB from '../Services/userServiceMDB';
import { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
	const response = await userServiceMDB.createUser();
	res.send(response);
};