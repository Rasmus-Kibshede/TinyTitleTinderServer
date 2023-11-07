import { userRepo } from '../Repositories/userRepository';
import { User } from '../Entities/User';
import { UserRequestDTO, UserResponseDTO } from '../DTO/userDTO';
import { getRoleById } from './roleService';
import { Role } from '../Entities/Role';
import { Result, ApiResponse, failed, success } from '../Utils/errorHandler';
import { BaseError } from '../Utils/BaseError';

export const createUser = async (UserRequestDTO: UserRequestDTO): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const role = await getRoleById(3) as unknown as Role;
if(!role){
    return failed('role');
}
        UserRequestDTO.roles = [];
        UserRequestDTO.roles.push(role);

        const response = await userRepo.save(UserRequestDTO);

        return success(convertToDTO(response));
    } catch (err) {
        return failed(err);
    }
};

export const getUserByID = async (id: number): Promise<Result<ApiResponse, BaseError>>  => {
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

export const getUsers = async (): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const users = await userRepo.findAll();
        const userDTOs: UserResponseDTO[] = users.map(user => convertToDTO(user));
        return success(userDTOs);
    } catch (err) {
        return failed(err);
    }
   
};

export const updateUser = async (userDTO: UserRequestDTO, email: string): Promise<Result<ApiResponse, BaseError>>  => {
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
    // Temporary solution before implementing generic validation on unique constraints
    return failed(err);
}
};


export const deleteUserByID = async (id: number): Promise<Result<ApiResponse, BaseError>>  => {
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
    };

    return dto;
};