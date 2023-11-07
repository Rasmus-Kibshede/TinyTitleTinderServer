"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByID = exports.updateUser = exports.getAllUsers = exports.getUserByID = exports.createUser = void 0;
const userService = __importStar(require("../Services/userService"));
//TODO Dependency injection eller String med besked om hvilken db
//TODO TYPEORM.
//TODO DTO entity
//TODO Validering af data, så applikation ikke crasher
const createUser = async (req, res) => {
    const UserRequestDTO = {
        email: req.body.email,
        password: req.body.password,
        roles: null
    };
    const response = await userService.createUser(UserRequestDTO);
    res.send(response);
};
exports.createUser = createUser;
const getUserByID = async (req, res) => {
    const response = await userService.getUserByID(Number(req.params.id));
    userRespone(response ? response : { err: response }, res, 200);
};
exports.getUserByID = getUserByID;
const getAllUsers = async (req, res) => {
    const response = await userService.getUsers();
    res.send(response);
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res) => {
    const userRequestDTO = {
        email: req.body.newEmail,
        password: req.body.password,
        roles: req.body.roles
    };
    const response = await userService.updateUser(userRequestDTO, req.body.email);
    userRespone(response ? response : { err: response }, res, 201);
};
exports.updateUser = updateUser;
const deleteUserByID = async (req, res) => {
    const response = await userService.deleteUserByID(Number(req.params.id));
    userRespone(response ? response : { err: response }, res, 201);
};
exports.deleteUserByID = deleteUserByID;
const userRespone = (response, res, statusCode) => {
    if (!response) {
        res.status(404).send({ err: response });
    }
    else {
        res.status(statusCode).send(response);
    }
};
