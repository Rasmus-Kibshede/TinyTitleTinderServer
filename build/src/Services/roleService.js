"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoleById = void 0;
const roleRepository_1 = require("../Repositories/roleRepository");
const getRoleById = async (id) => {
    const response = await roleRepository_1.roleRepo.findOneBy({
        roleId: id
    });
    if (!response)
        throw new Error('Role not found');
    return response;
};
exports.getRoleById = getRoleById;
