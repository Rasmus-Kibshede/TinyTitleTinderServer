"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRepo = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const Role_1 = require("../Entities/Role");
const data_source_1 = require("./data-source");
exports.roleRepo = data_source_1.appDataSource.getRepository(Role_1.Role);
