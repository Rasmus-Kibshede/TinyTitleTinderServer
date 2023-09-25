import { getUserByID as getUser } from '../database/userRepository';

export const getUserByID = (id: number) => {
    return getUser(id);
};