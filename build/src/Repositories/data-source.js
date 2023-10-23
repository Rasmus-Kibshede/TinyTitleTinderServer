"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../Entities/User");
const Role_1 = require("../Entities/Role");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    entities: [User_1.User, Role_1.Role],
    synchronize: false,
    logging: false
});
