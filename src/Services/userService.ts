//import { createUser as newUser } from '../Repositorys/userRepository';
import { userRepo } from '../Repositorys/userRepository';
import { User } from '../Entities/User';
import { UserDTO } from '../DTO/userDTO';
import { getroleByID } from './roleService';
import { Role } from '../Entities/Role';

export const createUser = async (userDTO: UserDTO) => {

    const role = await getroleByID(3) as Role;

    userDTO.roles = [role];

    if (!userDTO.roles) {
        //TODO: dev log
        return { err: 'Something went wrong, we have a team of highly dedicated, monkeys working on it' };
    }

    const save = await userRepo.save(userDTO);

    if (!save) {
        return { err: 'User not saved' };
    }

    return save;
};

export const getUserByID = async (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }

    const response = await userRepo.findOneBy({
        userId: id
    });

    return response || { err: 'User not found' };
};

export const getUsers = async () => {
    const users = await userRepo.find();
    return users;
};

export const updateUser = (user: User) => {
    return userRepo.save(user);
};


export const deleteUserByID = async (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }

    const user = await getUserByID(id) as User;

    if (!user) {
        return { err: 'User not found' };
    }

    user.userActive = false;

    const response = await userRepo.save(user);

    return response || { err: 'User not deleted' };
};


