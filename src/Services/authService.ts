import { userRepo } from '../Repositories/userRepository';

export const login = async (email: string, password: string) => {

    const user = userRepo.findOneByEmailAndPassword(email, password);

    return user;
};