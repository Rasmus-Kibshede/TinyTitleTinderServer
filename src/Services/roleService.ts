import { roleRepo } from '../Repositories/roleRepository';
import { Role } from '../Entities/Role';
import { RoleRequestDTO, RoleResponseDTO, RoleTitle } from '../DTO/roleDTO';
import { Result, ApiResponse, failed, success } from '../Utils/errorHandler';
import { BaseError } from '../Utils/BaseError';

export const createRole = async (roleRequestDTO: RoleTitle): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await roleRepo.save(roleRequestDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getRoleById = async (id: number): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await roleRepo.findOneByID(id);
        if (!response) {
            return failed('role');
        }

        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const getRoles = async (): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await roleRepo.findAll();
        const roleDTOs: RoleRequestDTO[] = response.map(role => convertToDTO(role));
        return success(roleDTOs);

    } catch (err) {
        return failed(err);
    }
};

export const updateRole = async (roleDTO: RoleTitle): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await roleRepo.save(roleDTO);
        return success(convertToDTO(response));

    } catch (err) {
        return failed(err);
    }
};

export const deleteRoleByID = async (roleId: number): Promise<Result<ApiResponse, BaseError>>  => {
    try {
        const response = await roleRepo.findOneById(roleId);

        if (!response) {
            return failed('role');
        }

        const deleted = await roleRepo.remove(response);
        return success(convertToDTO(deleted));

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