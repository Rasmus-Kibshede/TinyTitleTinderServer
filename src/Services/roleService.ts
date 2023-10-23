import { roleRepo } from '../Repositories/roleRepository';

export const getRoleById = async (id: number) => {

    const response = await roleRepo.findOneBy({
        roleId: id
    });

    if (!response) throw new Error('Role not found');

    return response;
};