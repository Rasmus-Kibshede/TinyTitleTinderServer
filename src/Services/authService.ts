import { Request, Response } from 'express';
import { failed, success } from '../Utils/errorHandler';
import { ValidateAuth, authSignin, clearToken } from '../Utils/jwtUtil';
import { User } from '../Entities/User';

export const login = async (user: User, res: Response) => {
  try {
    return authSignin(user, res);
  } catch (err) {
    return failed(err);
  }
};

export const checkAuth = async (req: Request) => {
  try {
    return success(ValidateAuth(req));
  } catch (err) {
    return failed(err);
  }
};

export const logout = async (res: Response) => {
  try {
    return success(clearToken(res));
  } catch (err) {
    return failed(err);
  }
};
