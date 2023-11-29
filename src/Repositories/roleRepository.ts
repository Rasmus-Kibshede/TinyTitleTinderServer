import { Role } from '../Entities/Role';
import { appDataSource } from './data-source';

export const roleRepo = appDataSource.getRepository(Role).extend({
    findAll() {
        return roleRepo.find({
            select: {
                roleId: true,
                title: true
            },
            relations: {
                users: true
            },
        });
    },
    findOneByID(id: number) {
        return roleRepo.findOne({
            where: {
                roleId: id
            }
        });
    }
});