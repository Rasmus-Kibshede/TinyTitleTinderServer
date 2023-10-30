import { roleRepo } from '../Repositories/roleRepository';
import { Role } from '../Entities/Role';
import { RoleRequestDTO, RoleResponseDTO } from '../DTO/roleDTO';


export const createRole = async (roleRequestDTO: RoleRequestDTO) => {
    try {
        const save = await roleRepo.save(roleRequestDTO);
        return convertToDTO(save);
    } catch (error) {
        return error.message === 'Role was not saved' ? { error: error.message } : 
        { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }
};

export const getRoleById = async (id: number) => {
try {
    const response = await roleRepo.findOneBy({
        roleId: id
    });

    if (!response) throw new Error('Role not found');

    return response;
} catch (error) {
    return error.message === 'Role was not saved' ? { error: error.message } : 
    { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
}   
};

export const getRoles = async () => {
    try {
        const roles = await roleRepo.findAll();
        const roleDTOs: RoleRequestDTO[] = roles.map(role => convertToDTO(role));
        return roleDTOs;
    } catch (error) {
        return error.message === 'Role was not saved' ? { error: error.message } : 
        { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }
    
};

export const updateRole = async (roleDTO: RoleRequestDTO) => {
    try {
        const update = await roleRepo.save(roleDTO);
        return convertToDTO(update);
    } catch (error) {
        return error.message === 'Role was not saved' ? { error: error.message } : 
        { error: 'Something went wrong! - We have a team of highly trained monkeys working on it' };
    }  
};

export const deleteRoleByID = async (roleDTO: RoleRequestDTO) => {
    try {
        const deleted = await roleRepo.remove(roleDTO);
        return convertToDTO(deleted);
    } catch (error) {
        return error.message === 'Role was not saved' ? { error: error.message } : 
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