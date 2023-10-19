//import { createUser as newUser } from '../Repositorys/userRepository';
import { userRepo } from '../Repositories/userRepository';
import { User } from '../Entities/User';
import { UserRequestDTO, UserResponseDTO } from '../DTO/userDTO';
import { getRoleById } from './roleService';

export const createUser = async (UserRequestDTO: UserRequestDTO) => {
    try {
        const role = await getRoleById(3);
        UserRequestDTO.roles = [];
        UserRequestDTO.roles.push(role);

        const save = await userRepo.save(UserRequestDTO);

        return convertToDTO(save);
    } catch (err) {
        return err.message === 'Role not found' ? { err: err.message } : { err: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }
};

export const getUserByID = async (id: number) => {
    const response = await userRepo.findOneByID(id);

    if (!response) {
        return { err: 'User not found' };
    }

    return convertToDTO(response);
};

export const getUsers = async () => {
    const users = await userRepo.findAll();
    const userDTOs: UserResponseDTO[] = users.map(user => convertToDTO(user));
    return userDTOs;
};

export const updateUser = async (userDTO: UserRequestDTO, email: string) => {
    //Future Developer log
    if (!userDTO) {
        return { err: 'invalid userDTO' };
    }

    const userDB = await userRepo.findOneByEmail(email) as User;

    if (!userDB) {
        return { err: 'User not found' };
    }

    userDB.email = userDTO.email;
    userDB.password = userDTO.password;

    const savedUser = await userRepo.save(userDB);
    if (!savedUser) {
        return { err: 'User could not be saved' };
    }

    return savedUser;
};


export const deleteUserByID = async (id: number) => {
    const response = await userRepo.findOneByID(id);

    if (!response || !response.userActive) {
        return { err: 'User not found' };
    }

    response.userActive = false;

    return convertToDTO(await userRepo.save(response)) || { err: 'User not deleted' };
};


export const convertToDTO = (user: User) => {
    const dto: UserResponseDTO = {
        email: user.email,
        userActive: user.userActive,
        roles: user.roles,
    };

    return dto;
};


