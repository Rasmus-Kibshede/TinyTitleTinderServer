import { getUserByID as getUser } from '../database/userRepository';
import { getUsers as users } from '../database/userRepository';
import { deleteUser } from '../database/userRepository';

export const getUserByID = (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }
    return getUser(id);
};

export const getUsers = () => {
    if (!users){
        return {err: 'No users'};
    }
    return users();
};

export const deleteUserByID = (id: number) => {
    if(!id){
        return {err: 'Invalid ID'};
    }
    return deleteUser(id);
};