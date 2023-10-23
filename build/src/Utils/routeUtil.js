"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNewMail = exports.validateCredintials = exports.validateParamsId = void 0;
const validator_1 = __importDefault(require("validator"));
// Middleware
const validateParamsId = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({ err: 'Invalid ID' });
    }
    else if (isNaN(Number(id))) {
        res.status(406).send({ err: 'Not Acceptable' });
    }
    next();
};
exports.validateParamsId = validateParamsId;
const validateCredintials = (req, res, next) => {
    const newEmail = req.body.email;
    const password = req.body.password;
    if (validator_1.default.isEmail(newEmail) && validator_1.default.isStrongPassword(password)) {
        next();
    }
    else {
        res.status(400).send({ err: 'Invalid credentials' });
    }
};
exports.validateCredintials = validateCredintials;
const validateNewMail = (req, res, next) => {
    const newEmail = req.body.newEmail;
    if (validator_1.default.isEmail(newEmail)) {
        next();
    }
    else {
        res.status(400).send({ err: 'Invalid email' });
    }
};
exports.validateNewMail = validateNewMail;
