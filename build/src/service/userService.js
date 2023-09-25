"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = void 0;
const userRepository_1 = require("../database/userRepository");
const getUserByID = (id) => {
    return (0, userRepository_1.getUserByID)(id);
};
exports.getUserByID = getUserByID;
