import { userRepo } from '../Repositories/Mysql/userRepository';
import { User } from '../Entities/Mysql/User';
import { UserLogin, UserRequestDTO, UserResponseDTO } from '../DTO/userDTO';
import { failed, success } from '../Utils/errorHandler';
import { roleRepo } from '../Repositories/Mysql/roleRepository';
import * as authService from './authService';
import { Response } from 'express';
import { comparePassword, hashPassword } from '../Utils/passwordUtil';
import { parentRepo } from '../Repositories/Mysql/parentRepository';
import { ParentResponseDTO } from '../DTO/parentDTO';
import { addressRepo } from '../Repositories/Mysql/addressRepository';
import { AddressResponseDTO } from '../DTO/addressDTO';
import * as nameService from './nameService';
import { NameResponseDTO } from '../DTO/nameDTO';

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
    const hashedPassword = await hashPassword(userRequestDTO.password);

    await userRepo.signUp([
      userRequestDTO.email,
      hashedPassword,
      userRequestDTO.parent?.age,
      userRequestDTO.parent?.gender,
      userRequestDTO.parent?.firstName,
      userRequestDTO.parent?.lastName,
      userRequestDTO.parent?.address.location?.locationId,
      userRequestDTO.parent?.address.city,
      userRequestDTO.parent?.address.zipcode,
      userRequestDTO.parent?.address.street,
    ]);

    return success('User created');
  } catch (err) {
    return failed(err);
  }
};

export const getUserByID = async (id: number) => {
  try {
    // const response = await repoHandler.dataUser()?.findOneUser(id);

    const response = await userRepo.findOneByID(id);
    if (!response) {
      return failed('user');
    }
    return success(convertToDTO(response as User));
  } catch (err) {
    return failed(err);
  }
};

export const getParentByEmailAndPassword = async (
  userLogin: UserLogin,
  res: Response
) => {
  try {
    const response = await userRepo.findOneByEmail(userLogin.email);  

    if (!response) {
      return failed(new Error('Email or password is incorrect'));
    }
    const isPasswordCorrect = await comparePassword(
      userLogin.password,
      response.password
    );  

    if (!isPasswordCorrect) {
      return failed(new Error('Email or password is incorrect'));
    }

    await userRepo.updateLastLogin(response.email);

    const parent = await parentRepo.findOneByID(response.parent.parentId) as ParentResponseDTO;
    if (!parent) {
      return failed(new Error('No Parent'));
    }

    if (!parent.likedNames) {
      const likedNames = await nameService.getNamesByParentId(parent.parentId!, 'true');

      if (likedNames.success) {
        parent.likedNames = likedNames.result.data as NameResponseDTO[];
      }

      const dislikedNames = await nameService.getNamesByParentId(parent.parentId!, 'false');

      if (dislikedNames.success) {
        parent.dislikedNames = dislikedNames.result.data as NameResponseDTO[];
      }
    }

    const user: UserResponseDTO = {
      email: response.email,
      roles: response.roles,
      parent: parent,

      userActive: false
    };

    const address = await addressRepo.findOneByID(Number(user.parent?.address.addressId)) as AddressResponseDTO;
    if (!address) {
      return failed(new Error('No Address'));
    }

    user.parent!.address = address;

    const token = await authService.login(response, res);
  
    return success({ user: user, token });
  } catch (err) {
    return failed(err);
  }
};

export const getUsers = async () => {
  try {
    const users = await userRepo.findAll();
    const userDTOs: UserResponseDTO[] = users.map((user: User) => convertToDTO(user));
    return success(userDTOs);
  } catch (err) {
    return failed(err);
  }
};

export const updateUser = async (userDTO: UserRequestDTO, email: string) => {
  try {
    const response = await userRepo.findOneByEmail(email);

    if (!response) {
      return failed(new Error('Email or password is incorrect'));
    }

    response.email = userDTO.email;
    response.password = userDTO.password === '' ? response.password :  await hashPassword(userDTO.password);

    const savedUser = await userRepo.save(response);
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
    parent: user.parent as ParentResponseDTO,
  };

  return dto;
};
