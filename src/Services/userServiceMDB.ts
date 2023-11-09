import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';
import { UserMDB } from '../Entities/MongoDBEntities/UserMDB';
import { userRepoMDB } from '../Repositories/userRepository';
import { UserRequestDTOMDB, UserResponseDTOMDB } from '../DTO/userDTOMDB';
import { failed, success } from '../Utils/errorHandler';
import { getRoleById } from './roleServiceMDB';

export const createUser = async (UserRequestDTOMDB: UserRequestDTOMDB) => {
    try {
        const role = await getRoleById('654d3f52466199c5ba2b1276') as unknown as RoleMDB;
        UserRequestDTOMDB.roles = [];
        UserRequestDTOMDB.roles.push(role);

        const save = await userRepoMDB.save(UserRequestDTOMDB);

        return success(convertToDTO(save));
    } catch (err) {
        return failed(err);
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        const response = await userRepoMDB.findOneByEmail(email);
        if (!response) {
            return failed('user');
        }
        return success(convertToDTO(response));
    } catch (err) {
        return failed(err);
    }
};

export const getUsers = async () => {
    try {
        const users = await userRepoMDB.findAll();
        const userDTOs: UserResponseDTOMDB[] = users.map(user => convertToDTO(user));
        return success(userDTOs);
    } catch(err) {
        return failed(err);
    }
};

export const updateUser = async (userRequestDTO: UserRequestDTOMDB, email: string) => {
    try {
        const userDB = await userRepoMDB.findOneByEmail(email) as UserMDB;
        userDB.email = userRequestDTO.email;
        userDB.password = userRequestDTO.password;

        const savedUser = await userRepoMDB.save(userDB);
        if (!savedUser) {
            return failed('user');
        }
        return success(convertToDTO(savedUser));
    } catch (error) {
        return failed(error);
    }
};


export const deleteUserByEmail = async (email: string) => {
    try {
        const response = await userRepoMDB.findOneAndDelete(getUserByEmail(email));
        if (!response) {
            return failed('user');
        }
        return success(response);
    } catch (err) {
        return failed(err);
    }
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