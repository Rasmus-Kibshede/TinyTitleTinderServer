//import { createUser as newUser } from '../Repositorys/userRepository';
import { userRepo } from '../Repositories/userRepository';
import { User } from '../Entities/User';
import { UserDTO } from '../DTO/userDTO';
import { getRoleById } from './roleService';
import { Role } from '../Entities/Role';

export const createUser = async (userDTO: UserDTO) => {
    const role = await getRoleById(3) as Role;
    
    if(!role){
        return {err: 'Role not found'};
    }

    userDTO.roles = [];
    userDTO.roles.push(role);
    
    if (!userDTO.roles) {
        //TODO: dev log
        return { err: 'Something went wrong! - We have a team of highly trained monkeys working on it'};
    }

    const save = await userRepo.save(userDTO);

    if (!save) {
        return { err: 'User not saved' };
    }

    return convertToDTO(save);
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
    const userDTOs: UserDTO[] = users.map(user => convertToDTO(user));
    return userDTOs;
};

export const updateUser = async (userDTO: UserDTO, id: number) => {
    //Future Developer log
    if (!userDTO) {
        return { err: 'invalid userDTO' };
    }

    const userDB = await getUserByID(id) as User;
    if (!userDB) {
        return { err: 'User not found' };
    }

    userDB.email = userDTO.email;
    userDB.password = userDTO.password;

    const savedUser = await userRepo.save(userDB) as User;
    if (!savedUser) {
        return { err: 'User could not be saved' };
    }

    return convertToDTO(savedUser);
};


export const deleteUserByID = async (id: number) => {
    const response = await userRepo.findOneByID(id);

    if (!response || !response.userActive) {
        return { err: 'User not found' };
    }

    response.userActive = false;

    return convertToDTO(await userRepo.save(response)) || { err: 'User not deleted' };
};


const convertToDTO = (user: User) => {
    const dto: UserDTO = {
        email: user.email,
        password: user.password,
        userActive: user.userActive,
        roles: user.roles,
    };

    return dto;
};


