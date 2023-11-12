import { UserLogin } from '../DTO/userDTO';
import { Request } from 'express';
import { userRepo } from '../Repositories/userRepository';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, failed, success } from '../Utils/errorHandler';
import { ValidateAuth } from '../Utils/jwtUtil';

export const login = async (
  userLogin: UserLogin
): Promise<Result<ApiResponse, BaseError>> => {
  try {
    const response = await userRepo.findOneByEmailAndPassword(
      userLogin.email,
      userLogin.password
    );
    return { success: true, result: { data: response! } };
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
