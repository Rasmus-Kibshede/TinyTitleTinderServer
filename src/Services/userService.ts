import moment from 'moment';
//import { createUser as newUser } from '../Repositorys/userRepository';
import { userRepo } from '../Repositorys/userRepository';
import { User } from '../DTO/userDTO';

//TODO SKAL I UTILS. 
const userCreation = (user: User) => {
    const currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
    user.createdAt = currentTime;
    user.userActive = true;
    user.lastLogin = currentTime;
    return user;
};

export const createUser = async (user: User) => {
    user = userCreation(user);
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
/*
export const getUsers = () => {
    if (!users) {
        return { err: 'No users' };
    }
    return users();
};

export const updateUser = (user: User) => {
    return update(user);
};

export const deleteUserByID = (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }
    return deleteUser(id);
};
*/

