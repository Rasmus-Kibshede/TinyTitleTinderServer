"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = void 0;
const userService_1 = require("../service/userService");
const getUserByID = (req, res) => {
    const response = (0, userService_1.getUserByID)(Number(req.params.id));
    console.log(response);
    res.send(response);
};
exports.getUserByID = getUserByID;
