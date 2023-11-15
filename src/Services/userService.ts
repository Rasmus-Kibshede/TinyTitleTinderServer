import { userRepo } from '../Repositories/userRepository';
import { User } from '../Entities/User';
import { UserRequestDTO, UserResponseDTO } from '../DTO/userDTO';
import { getRoleById } from './roleService';
import { Role } from '../Entities/Role';
import { failed, success } from '../Utils/errorHandler';
import { parentRepo } from '../Repositories/parentRepository';

export const createUser = async (UserRequestDTO: UserRequestDTO) => {
    try {
        const role = await getRoleById(3) as unknown as Role;
        if (!role) {
            return failed('role');
        }
        UserRequestDTO.roles = [];
        UserRequestDTO.roles.push(role);

        const response = await userRepo.save(UserRequestDTO as User);

        return success(convertToDTO(response));
    } catch (err) {
        return failed(err);
    }
};

export const signUp = async (userRequestDTO: UserRequestDTO) => {
    try {
        console.log('userREquestDTO = ',userRequestDTO);
        
        const userWithRole = await setRole(userRequestDTO) as UserRequestDTO;
        const parentResponse = await parentRepo.save(userWithRole.parent!);
        console.log('parentResponse database = ',parentResponse);
        
        userWithRole.parent = parentResponse;
        const userResponse = await userRepo.save(userWithRole as User);
        
        console.log('saved user Database = ',userResponse);
        
        
        return success(userResponse);
    } catch (err) {
        return failed(err);
    }
};

export const getUserByID = async (id: number) => {
    try {
        const response = await userRepo.findOneByID(id);
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
        const users = await userRepo.findAll();
        const userDTOs: UserResponseDTO[] = users.map(user => convertToDTO(user));
        return success(userDTOs);
    } catch (err) {
        return failed(err);
    }

};

export const updateUser = async (userDTO: UserRequestDTO, email: string) => {
    try {
        const userDB = await userRepo.findOneByEmail(email) as User;
        userDB.email = userDTO.email;
        userDB.password = userDTO.password;

        const savedUser = await userRepo.save(userDB);
        if (!savedUser) {
            return failed('user');
        }
        return success(convertToDTO(savedUser));

    } catch (err) {
        return failed(err);
    }
};


export const deleteUserByID = async (id: number) => {
    try {
        const response = await userRepo.findOneByID(id);
        if (!response || !response.userActive) {
            return failed('user');
        }

        response.userActive = false;
        const deleted = await userRepo.save(response);
        return success(convertToDTO(deleted));

    } catch (err) {
        return failed(err);
    }
};


export const convertToDTO = (user: User) => {
    const dto: UserResponseDTO = {
        email: user.email,
        userActive: user.userActive,
        roles: user.roles,
        parent: user.parent
    };

    return dto;
};

const setRole = async (userRequestDTO: UserRequestDTO) => {
    const responseRole = await getRoleById(3);
    if (!responseRole || !responseRole.success) {
        return failed('role');
    }

    userRequestDTO.roles = [];
    userRequestDTO.roles.push(responseRole.result.data as Role);

    return userRequestDTO;
};