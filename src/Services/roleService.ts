import { roleRepo } from '../Repositories/roleRepository';
import { Role } from '../Entities/Role';
import { RoleRequestDTO, RoleResponseDTO, RoleTest } from '../DTO/roleDTO';


export const createRole = async (roleRequestDTO: RoleTest) => {
    try {
        const response = await roleRepo.save(roleRequestDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Role was not saved' ? { error: error.message } :
            { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }
};

export const getRoleById = async (id: number) => {
    try {
        const response = await roleRepo.findOneByID(id);

        if (!response) throw new Error('Role not found');

        return convertToDTO(response);
    } catch (error) {
        return error.message === 'Role not found' ? { error: error.message } :
            { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }
};

export const getRoles = async () => {
    try {
        const response = await roleRepo.findAll();
        const roleDTOs: RoleRequestDTO[] = response.map(role => convertToDTO(role));
        return roleDTOs;

    } catch (error) {
        return error.message === 'No Roles found' ? { error: error.message } :
            { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }
};

export const updateRole = async (roleDTO: RoleTest) => {
    try {        
        const response = await roleRepo.save(roleDTO);
        return convertToDTO(response);

    } catch (error) {
        return error.message === 'Role was not updated' ? { error: error.message } :
            { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
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
        return error.message === 'Role was not deleted' ? { error: error.message } :
            { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
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