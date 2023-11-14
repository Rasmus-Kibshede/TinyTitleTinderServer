import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';
import { UserMDB } from '../Entities/MongoDBEntities/UserMDB';
import { userRepoMDB } from '../Repositories/userRepository';
import { UserRequestDTOMDB, UserResponseDTOMDB } from '../DTO/userDTOMDB';
import { failed, success } from '../Utils/errorHandler';
import { roleRepoMDB } from '../Repositories/roleRepository';
import { ObjectId } from 'mongodb';

export const createUser = async (UserRequestDTOMDB: UserRequestDTOMDB) => {
    try {
        
        const id = new ObjectId('654d3f52466199c5ba2b1276');
        const role = await roleRepoMDB.findOneByID(id) as unknown as RoleMDB;
        if (!role) {
            return failed('role');
        }
        UserRequestDTOMDB.roles = [];
        UserRequestDTOMDB.roles.push(role);

        const response = await userRepoMDB.save(UserRequestDTOMDB);

        return success(convertToDTO(response));
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
    } catch (err) {
        return failed(err);
    }
};

export const updateUser = async (userRequestDTO: UserRequestDTOMDB, email: string) => {
    try {
        const response = await userRepoMDB.findOneAndUpdate(
            { email: email },
            { $set: userRequestDTO },
            { returnDocument: 'after' }
        );

        if (!response.value) {
            return failed('user');
        }

        return success(response.value);

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