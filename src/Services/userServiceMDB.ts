import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';
import { UserMDB } from '../Entities/MongoDBEntities/UserMDB';
import { userRepoMDB } from '../Repositories/userRepository';
import { UserRequestDTOMDB, UserResponseDTOMDB } from '../DTO/userDTOMDB';

export const createUser = async (UserRequestDTOMDB: UserRequestDTOMDB) => {
    try {
        const role = new RoleMDB('user');
        UserRequestDTOMDB.roles = [];
        UserRequestDTOMDB.roles.push(role);

        const save = await userRepoMDB.save(UserRequestDTOMDB);

        return convertToDTO(save);
    } catch (error) {
        return error.message === 'Couldn\'t find any meaning (with life)!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getUserByEmail = async (email: string) => {
    const response = await userRepoMDB.findOneByEmail(email);

    if (!response) {
        return { err: 'User not found' };
    }

    return convertToDTO(response);
};

export const getUsers = async () => {
    const users = await userRepoMDB.findAll();
    const userDTOs: UserResponseDTOMDB[] = users.map(user => convertToDTO(user));
    return userDTOs;
};

export const updateUser = async (userDTO: UserRequestDTOMDB, email: string) => {
    try {
        const userDB = await userRepoMDB.findOneByEmail(email) as UserMDB;

        if (!userDB) {
            return { err: 'User not found' };
        }

        userDB.email = userDTO.email;
        userDB.password = userDTO.password;

        const savedUser = await userRepoMDB.save(userDB);
        if (!savedUser) {
            return { err: 'User could not be saved' };
        }

        return convertToDTO(savedUser);

    } catch (error) {
        // Temporary solution before implementing generic validation on unique constraints
        if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
            return error.message === 'Something went wrong!- we are working on it!' ? { err: error.message } : { err: 'Email already exists' };
        } else {
            return error.message === 'Couldn\'t find any meaning (with life)!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
        }
    }
};


export const deleteUserByEmail = async (email: string) => {
    return await await userRepoMDB.findOneAndDelete(getUserByEmail(email));
};

export const convertToDTO = (user: UserMDB) => {
    const dto: UserResponseDTOMDB = {
        email: user.email,
        userActive: user.userActive,
        roles: user.roles,
        parent: user.parent
    };

    return dto;
};