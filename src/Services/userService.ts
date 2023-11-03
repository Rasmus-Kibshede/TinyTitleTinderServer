import { userRepo } from '../Repositories/userRepository';
import { User } from '../Entities/User';
import { UserRequestDTO, UserResponseDTO } from '../DTO/userDTO';
import { getRoleById } from './roleService';
import { Role } from '../Entities/Role';

export const createUser = async (UserRequestDTO: UserRequestDTO) => {
    try {
        const role = await getRoleById(3) as Role;
        UserRequestDTO.roles = [];
        UserRequestDTO.roles.push(role);

        const save = await userRepo.save(UserRequestDTO);

        return convertToDTO(save);
    } catch (error) {
        // Temporary solution before implementing generic validation on unique constraints
        if (error instanceof Error && 'code' in error && error.code === 'ER_DUP_ENTRY') {
            return error.message === 'Something went wrong!- we are working on it!' ? { err: error.message } : { err: 'Email already exists' };
        } else {
            return error.message === 'Couldn\'t find any meaning (with life)!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
        }
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
   try {
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


