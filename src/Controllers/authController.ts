import { Request, Response } from 'express';
import * as authService from '../Services/authService';

export const login = async (req: Request, res: Response) => {
    const body = req.body;
    authService.login(body.email, body.password);

    res.send({});
};