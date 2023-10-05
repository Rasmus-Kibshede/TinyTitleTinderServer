import { roleRepo } from '../Repositories/roleRepository';

export const getRoleById = async (id: number) => {

    const response = await roleRepo.findOneBy({
        roleId: id
    });

    return response || { err: 'Role not found' };
};