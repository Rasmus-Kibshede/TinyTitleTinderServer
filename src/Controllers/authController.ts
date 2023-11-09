import { Request, Response } from 'express';
import * as authService from '../Services/authService';
import { UserResponseDTO, UserLogin } from '../DTO/userDTO';
import { authSignin } from '../Utils/jwtUtil';
import * as responseController from '../Controllers/responseController';

export const login = async (req: Request, res: Response) => {
    try {
        const userLogin: UserLogin = {
            email: req.body.email,
            password: req.body.password
        };

        const response = await authService.login(userLogin);
        if (!response.success) {
            throw new Error('temp');
        }

        authSignin(response.result.data as UserResponseDTO, res);
    } catch (err) {
        res.status(400).send(err.message);
        responseController.response(res, err, 400);
    }
};

export const checkAuth = async (req: Request, res: Response) => {
    res.send({ auth: req.body.tokenlogin });
};