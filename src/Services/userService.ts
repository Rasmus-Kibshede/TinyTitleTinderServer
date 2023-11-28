import { userRepo } from '../Repositories/userRepository';
import { User } from '../Entities/User';
import { UserLogin, UserRequestDTO, UserResponseDTO } from '../DTO/userDTO';
import { failed, success } from '../Utils/errorHandler';
import { roleRepo } from '../Repositories/roleRepository';
import * as authService from './authService';
import { Response } from 'express';
import { ParentResponseDTO } from '../DTO/parentDTO';
import { AddressResponseDTO } from '../DTO/addressDTO';
import { LocationResponseDTO } from '../DTO/locationDTO';
import * as locationRepo from '../Repositories/locationRepository';

export const createUser = async (UserRequestDTO: UserRequestDTO) => {
  try {
    const role = await roleRepo.findOneByID(3);
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
    const userResponse = await userRepo.signUp([
      userRequestDTO.email,
      userRequestDTO.password,
      userRequestDTO.parent?.age,
      userRequestDTO.parent?.gender,
      userRequestDTO.parent?.firstName,
      userRequestDTO.parent?.lastName,
      userRequestDTO.parent?.address.location?.locationId,
      userRequestDTO.parent?.address.city,
      userRequestDTO.parent?.address.zipcode,
      userRequestDTO.parent?.address.street,
    ]);

    const addressDTO: AddressResponseDTO = {
      city: userResponse.city,
      zipcode: userResponse.zipcode,
      street: userResponse.address,
      location: await locationRepo.locationRepo.findOneByID(userResponse.locationId) as LocationResponseDTO
    };

    const paretDTO: ParentResponseDTO = {
      age: userResponse.age,
      gender: userResponse.gender,
      firstName: userResponse.firstName,
      lastName: userResponse.lastName,
      families: [],
      address: addressDTO
    };

    const userDTO: UserResponseDTO = {
      email: userResponse.email,
      userActive: true,
      roles: await roleRepo.findOneByID(3),
      parent: paretDTO
    };

    return success(userDTO);
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

export const getParentByEmailAndPassword = async (
  userLogin: UserLogin,
  res: Response
) => {
  try {
    const response = await userRepo.findOneByEmailAndPassword(
      userLogin.email,
      userLogin.password
    );

    if (!response) {
      return failed('user');
    }

    await userRepo.updateLastLogin(response.email);

    const user: UserResponseDTO = {
      email: response.email,
      roles: response.roles,
      parent: {
        firstName: response.parent.firstName,
        lastName: response.parent.lastName,
        age: response.parent.age,
        gender: response.parent.gender,
        parentId: response.parent.parentId,
        address: response.parent.address,
      },
      userActive: true,
    };

    const token = await authService.login(response, res);

    return success({ user, token });
  } catch (err) {
    return failed(err);
  }
};

export const getUsers = async () => {
  try {
    const users = await userRepo.findAll();
    const userDTOs: UserResponseDTO[] = users.map((user) => convertToDTO(user));
    return success(userDTOs);
  } catch (err) {
    return failed(err);
  }
};

export const updateUser = async (userDTO: UserRequestDTO, email: string) => {
  try {
    const userDB = (await userRepo.findOneByEmail(email)) as User;
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
    parent: user.parent,
  };

  return dto;
};
