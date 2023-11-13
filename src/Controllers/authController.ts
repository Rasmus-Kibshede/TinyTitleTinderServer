import { Request, Response } from 'express';
import * as authService from '../Services/authService';
import { UserResponseDTO, UserLogin } from '../DTO/userDTO';
import { authSignin } from '../Utils/jwtUtil';
import * as responseController from '../Controllers/responseController';
import * as userService from '../Services/userService';

export const login = async (req: Request, res: Response) => {
  const userLogin: UserLogin = {
    email: req.body.email,
    password: req.body.password,
  };

  const response = await userService.getUserByEmailAndPassword(userLogin);

  if (!response.success) {
    throw new Error('User not found');
  }

  authSignin(response.result.data as UserResponseDTO, res);

  responseController.response(res, response, 200);
};

export const checkAuth = async (req: Request, res: Response) => {
  const response = await authService.checkAuth(req);
  responseController.response(res, response, 200);
};

export const logout = async (req: Request, res: Response) => {
  const response = await authService.logout(res);
  responseController.response(res, response, 200);
};
