"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByID = void 0;
const connectionMYSQL_1 = __importDefault(require("./connectionMYSQL"));
const getUserByID = async (id) => {
    const [rows] = await connectionMYSQL_1.default.query('SELECT * FROM user WHERE user_id = (?)', [id]);
    return { data: rows[0] };
};
exports.getUserByID = getUserByID;
