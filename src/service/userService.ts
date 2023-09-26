import moment from 'moment';
import { getUserByID as getUser } from '../database/userRepository';
import { getUsers as users } from '../database/userRepository';
import { deleteUser } from '../database/userRepository';
import { createUser as newUser } from '../database/userRepository';
import { updateUser as update } from '../database/userRepository';

import { User } from '../model/user';

//TODO SKAL I UTILS. 
const userCreation = (user: User) => {
    const currentTime = moment().format('YYYY-MM-DD hh:mm:ss');
    user.createdAt = currentTime;
    user.userActive = true;
    user.lastLogin = currentTime;
    return user;
};

export const createUser = async (user: User) => {
    const testUser = userCreation(user);
    return newUser(testUser);
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

export const updateUser = (user: User) => {
    return update(user);
};

export const deleteUserByID = (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }
    return deleteUser(id);
};


