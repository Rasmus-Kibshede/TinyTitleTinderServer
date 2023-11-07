"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToDTO = exports.deleteUserByID = exports.updateUser = exports.getUsers = exports.getUserByID = exports.createUser = void 0;
//import { createUser as newUser } from '../Repositorys/userRepository';
const userRepository_1 = require("../Repositories/userRepository");
const roleService_1 = require("./roleService");
const createUser = async (UserRequestDTO) => {
    try {
        const role = await (0, roleService_1.getRoleById)(3);
        UserRequestDTO.roles = [];
        UserRequestDTO.roles.push(role);
        const save = await userRepository_1.userRepo.save(UserRequestDTO);
        return (0, exports.convertToDTO)(save);
    }
    catch (err) {
        return err.message === 'Role not found' ? { err: err.message } : { err: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }
};
exports.createUser = createUser;
const getUserByID = async (id) => {
    const response = await userRepository_1.userRepo.findOneByID(id);
    if (!response) {
        return { err: 'User not found' };
    }
    return (0, exports.convertToDTO)(response);
};
exports.getUserByID = getUserByID;
const getUsers = async () => {
    const users = await userRepository_1.userRepo.findAll();
    const userDTOs = users.map(user => (0, exports.convertToDTO)(user));
    return userDTOs;
};
exports.getUsers = getUsers;
const updateUser = async (userDTO, email) => {
    //Future Developer log
    if (!userDTO) {
        return { err: 'invalid userDTO' };
    }
    const userDB = await userRepository_1.userRepo.findOneByEmail(email);
    if (!userDB) {
        return { err: 'User not found' };
    }
    userDB.email = userDTO.email;
    userDB.password = userDTO.password;
    const savedUser = await userRepository_1.userRepo.save(userDB);
    if (!savedUser) {
        return { err: 'User could not be saved' };
    }
    return savedUser;
};
exports.updateUser = updateUser;
const deleteUserByID = async (id) => {
    const response = await userRepository_1.userRepo.findOneByID(id);
    if (!response || !response.userActive) {
        return { err: 'User not found' };
    }
    response.userActive = false;
    return (0, exports.convertToDTO)(await userRepository_1.userRepo.save(response)) || { err: 'User not deleted' };
};
exports.deleteUserByID = deleteUserByID;
const convertToDTO = (user) => {
    const dto = {
        email: user.email,
        userActive: user.userActive,
        roles: user.roles,
    };
    return dto;
};
exports.convertToDTO = convertToDTO;
