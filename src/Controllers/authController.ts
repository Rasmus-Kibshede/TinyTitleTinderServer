import { Request, Response } from 'express';
import * as authService from '../Services/authService';
import { UserLogin } from '../DTO/userDTO';
import * as responseController from '../Controllers/responseController';
import * as parentService from '../Services/parentService';
import { ParentResponseDTO } from '../DTO/parentDTO';
import { failed, success } from '../Utils/errorHandler';

export const login = async (req: Request, res: Response) => {
  const userLogin: UserLogin = {
    email: req.body.email,
    password: req.body.password,
  };

  const response = await parentService.getParentByEmailAndPassword(userLogin);

  const t = await authService.login(response as ParentResponseDTO, res);

  if (!t) {
    responseController.response(res, failed('Parent'), 200);
  }

  responseController.response(res, success(t!), 200);
};

export const checkAuth = async (req: Request, res: Response) => {
  const response = await authService.checkAuth(req);
  responseController.response(res, response, 200);
};

export const logout = async (req: Request, res: Response) => {
  const response = await authService.logout(res);
  responseController.response(res, response, 200);
};
