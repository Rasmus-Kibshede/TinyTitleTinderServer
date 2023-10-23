"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSignin = exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authorize = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(401).json({ auth: false, message: 'No token provided.' });
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.body.tokenlogin = decoded;
            next();
        }
        catch (err) {
            res.status(500).send({ err: `Invalid token: ${err.message}` });
        }
    }
};
exports.authorize = authorize;
const authSignin = (user, res) => {
    try {
        const bearerToken = jsonwebtoken_1.default.sign({ tokenlogin: user }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });
        res.header('Authorization', `Bearer ${bearerToken}`);
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send({ err: err });
    }
};
exports.authSignin = authSignin;
