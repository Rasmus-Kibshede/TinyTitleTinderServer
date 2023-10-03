import { roleRepo } from '../Repositorys/roleRepository';

export const getroleByID = async (id: number) => {
    if (!id) {
        return { err: 'Invalid ID' };
    }

    const response = await roleRepo.findOneBy({
        roleId: id
    });

    return response || { err: 'Role not found' };
};