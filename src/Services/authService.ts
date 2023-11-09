import { UserLogin } from '../DTO/userDTO';
import { userRepo } from '../Repositories/userRepository';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, failed } from '../Utils/errorHandler';

export const login = async (userLogin: UserLogin): Promise<Result<ApiResponse, BaseError>> =>  {
try{
    const response = await userRepo.findOneByEmailAndPassword(userLogin.email, userLogin.password);
    return { success: true, result:{data: response!}};
} catch (err) {
    return failed(err);
}
};