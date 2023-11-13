import { Request, Response } from 'express';
import { failed, success } from '../Utils/errorHandler';
import { ValidateAuth, clearToken } from '../Utils/jwtUtil';

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
