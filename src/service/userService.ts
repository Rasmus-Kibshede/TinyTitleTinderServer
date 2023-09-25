import moment from 'moment';
import { getUserByID as getUser } from '../database/userRepository';
import { getUsers as users } from '../database/userRepository';
import { deleteUser } from '../database/userRepository';
import { createUser as newUser } from '../database/userRepository';
import { User } from '../model/user';

//TODO SKAL I UTILS. 
const currentTime = moment().format('DD-MM-YYYY hh:mm:ss');

export const createUser = (user: User) => {

    user.createdAt = currentTime;
    user.userActive = true;
    user.lastLogin = currentTime;
    user.role = null;
    return newUser(user);
};

export const getUserByID = (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }
    return getUser(id);
};

export const getUsers = () => {
    if (!users) {
        return { err: 'No users' };
    }
    return users();
};

export const deleteUserByID = (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }
    return deleteUser(id);
};


