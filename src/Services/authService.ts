import { userLogin } from '../DTO/userDTO';
import { userRepo } from '../Repositories/userRepository';
import { BaseError } from '../Utils/BaseError';
import { Result, ApiResponse, ensureError } from '../Utils/errorHandler';

export const login = async (userLogin: userLogin): Promise<Result<ApiResponse, BaseError>> =>  {
try{
    const response = await userRepo.findOneByEmailAndPassword(userLogin.email, userLogin.password);
    return { success: true, result:{data: response!}};
    
} catch (err) {
    //TODO Add custom message for each endpoint
    //TODO Add dynamic statuscode from the ErrorType.
    const error = ensureError(err);
    return { success: false, error: new BaseError('Could not create address', {
        error: error, 
        statusCode: 404
    })};
}
};