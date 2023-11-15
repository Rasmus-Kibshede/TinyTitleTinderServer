import { Request, Response } from 'express';
import { failed, success } from '../Utils/errorHandler';
import { ValidateAuth, authSignin, clearToken } from '../Utils/jwtUtil';
import { ParentResponseDTO } from '../DTO/parentDTO';

export const login = async (parent: ParentResponseDTO, res: Response) => {
  return authSignin(parent, res);
};

export const checkAuth = async (req: Request) => {
  try {
    return success(ValidateAuth(req));
  } catch (err) {
    return failed(err);
  }
};

export const logout = async (res: Response) => {
  return success(clearToken(res));
};
