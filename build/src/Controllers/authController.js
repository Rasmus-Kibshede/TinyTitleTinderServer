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
exports.checkAuth = exports.login = void 0;
const authService = __importStar(require("../Services/authService"));
const jwtUtil_1 = require("../Utils/jwtUtil");
const login = async (req, res) => {
    try {
        const userLogin = {
            email: req.body.email,
            password: req.body.password
        };
        const response = await authService.login(userLogin);
        (0, jwtUtil_1.authSignin)(response, res);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
};
exports.login = login;
const checkAuth = async (req, res) => {
    res.send({ auth: req.body.tokenlogin });
};
exports.checkAuth = checkAuth;
