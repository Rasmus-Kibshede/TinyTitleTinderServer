"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const User_1 = require("../Entities/User");
const data_source_1 = require("./data-source");
exports.userRepo = data_source_1.appDataSource.getRepository(User_1.User).extend({
    findOneByID(id) {
        return exports.userRepo.findOne({
            relations: {
                roles: true
            },
            where: {
                userId: id
            },
        });
    },
    findOneByEmail(email) {
        return exports.userRepo.findOne({
            relations: {
                roles: true
            },
            where: {
                email: email
            },
        });
    },
    findOneByEmailAndPassword(email, password) {
        return exports.userRepo.findOne({
            relations: {
                roles: true
            },
            where: {
                email: email,
                password: password
            },
        });
    },
    findAll() {
        return exports.userRepo.find({
            relations: {
                roles: true
            },
        });
    }
});
