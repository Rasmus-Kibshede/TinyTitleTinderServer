//import { createUser as newUser } from '../Repositorys/userRepository';
import { userRepo } from '../Repositorys/userRepository';
import { User } from '../Entities/User';

export const createUser = async (user: User) => {
    user.userActive = true;
    const save = await userRepo.save(user);
    return save;
};

export const getUserByID = (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }
    return userRepo.findBy({
        userId: id
    });
};

export const getUsers = async () => {
    const users = await userRepo.find();
    return users;
};

export const updateUser = (user: User) => {
    return userRepo.save(user);
};
/*
export const deleteUserByID = (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }
    return deleteUser(id);
};
*/

