import { roleRepo } from '../Repositories/roleRepository';
import { Role } from '../Entities/Role';
import { RoleRequestDTO, RoleResponseDTO, RoleTitle } from '../DTO/roleDTO';


export const createRole = async (roleRequestDTO: RoleTitle) => {
    try {
        const response = await roleRepo.save(roleRequestDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Something went wrong, Role not saved!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getRoleById = async (id: number) => {
    try {
        const response = await roleRepo.findOneByID(id);

        if (!response) throw new Error('Role not found');

        return convertToDTO(response);
    } catch (error) {
        return error.message === 'Couldn\'t find any Role with that id!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const getRoles = async () => {
    try {
        const response = await roleRepo.findAll();
        const roleDTOs: RoleRequestDTO[] = response.map(role => convertToDTO(role));
        return roleDTOs;

    } catch (error) {
        return error.message === 'Couldn\'t find any Roles!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const updateRole = async (roleDTO: RoleTitle) => {
    try {        
        const response = await roleRepo.save(roleDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Couldn\'t find any Role to update!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
    }
};

export const deleteRoleByID = async (roleId: number) => {
    try {
        const response = await roleRepo.findOneById(roleId);

        if (!response) {
            return { err: 'Role not found' };
        }

        const deleted = await roleRepo.remove(response);
        return convertToDTO(deleted);

    } catch (error) {
        return error.message === 'Couldn\'t find any Role!' ? { err: error.message } : { err: 'Something went wrong!- we are working on it!' };
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