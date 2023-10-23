import { Request, Response } from 'express';
import * as authService from '../Services/authService';
import { userLogin } from '../DTO/userDTO';
import { authSignin } from '../Utils/jwtUtil';

export const login = async (req: Request, res: Response) => {
    try {
        const userLogin: userLogin = {
            email: req.body.email,
            password: req.body.password
        };

        const response = await authService.login(userLogin);
        authSignin(response, res);
    } catch (err) {
        res.status(400).send(err.message);
    }
};

export const checkAuth = async (req: Request, res: Response) => {

    res.send({ auth: req.body.tokenlogin });
};