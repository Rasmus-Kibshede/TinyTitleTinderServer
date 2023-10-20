import { userLogin } from '../DTO/userDTO';
import { userRepo } from '../Repositories/userRepository';
import { convertToDTO } from './userService';

export const login = async (userLogin: userLogin) => {

    const response = await userRepo.findOneByEmailAndPassword(userLogin.email, userLogin.password);

    if (!response) throw new Error('User not found');

    return convertToDTO(response);
};