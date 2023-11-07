"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const userRepository_1 = require("../Repositories/userRepository");
const userService_1 = require("./userService");
const login = async (userLogin) => {
    const response = await userRepository_1.userRepo.findOneByEmailAndPassword(userLogin.email, userLogin.password);
    if (!response)
        throw new Error('User not found');
    return (0, userService_1.convertToDTO)(response);
};
exports.login = login;
