import { roleRepo } from '../Repositories/roleRepository';
import { Role } from '../Entities/Role';
import { RoleRequestDTO, RoleResponseDTO, RoleTitle } from '../DTO/roleDTO';
import { Result, ApiResponse, failed } from '../Utils/errorHandler';
import { BaseError } from '../Utils/BaseError';

export const createRole = async (roleRequestDTO: RoleTitle) => {
    try {
        const response = await roleRepo.save(roleRequestDTO);
        return success(response);

    } catch (err) {
        return failed(err);
    }
};

export const getRoleById = async (id: number) => {
    try {
        const response = await roleRepo.findOneByID(id);
        if (!response) {
            return failed('role');
        }

        return success(response);

    } catch (err) {
        return failed(err);
    }
};

export const getRoles = async () => {
    try {
        const response = await roleRepo.findAll();
        const roleDTOs: RoleRequestDTO[] = response.map(role => convertToDTO(role));
        return success(roleDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const updateRole = async (roleDTO: RoleTitle) => {
    try {
        const response = await roleRepo.save(roleDTO);
        return success(response);

    } catch (err) {
        return failed(err);
    }
};

export const deleteRoleByID = async (roleId: number) => {
    try {
        const response = await roleRepo.findOneById(roleId);

        if (!response) {
            return failed('role');
        }

        const deleted = await roleRepo.remove(response);
        return success(deleted);

    } catch (err) {
        return failed(err);
    }
};

export const convertToDTO = (role: Role) => {
    const dto: RoleResponseDTO = {
        roleId: role.roleId,
        title: role.title,
        users: role.users
    };

    return dto;
};

function success(response: Role | RoleResponseDTO[]): Result<ApiResponse, BaseError> {
    if (Array.isArray(response)) {
        return { success: true, result: { data: response } };
    } else {
        return { success: true, result: { data: convertToDTO(response) } };
    }
}