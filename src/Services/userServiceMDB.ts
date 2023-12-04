import { UserMDB, UserRolesInner } from '../Entities/MongoDBEntities/UserMDB';
import { userRepoMDB } from '../Repositories/mysql/userRepository';
import { UserRequestDTOMDB, UserResponseDTOMDB } from '../DTO/userDTOMDB';
import { failed, success } from '../Utils/errorHandler';

export const createUser = async (UserRequestDTOMDB: UserRequestDTOMDB) => {
    try {
        const userRole = new UserRolesInner('User');
        UserRequestDTOMDB.roles = [];
        UserRequestDTOMDB.roles.push(userRole);
        // Setting user active to default here works, and is being saved to the database
        UserRequestDTOMDB.userActive = true;

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

export const updateUser = async (userRequestDTOMDB: UserRequestDTOMDB, email: string) => {
    try {
        // MongoDB specific operation - TODO: consider using findOneAndUpdate instead
        // const response = await userRepoMDB.findOneAndUpdate(
        //     { email: email },
        //     { $set: userRequestDTOMDB },
        //     { returnDocument: 'after' }
        // );
        
        const userDB = await userRepoMDB.findOneByEmail(email) as UserRequestDTOMDB;
        userDB.email = userRequestDTOMDB.email;
        userDB.password = userRequestDTOMDB.password;

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
    };

    return dto;
};