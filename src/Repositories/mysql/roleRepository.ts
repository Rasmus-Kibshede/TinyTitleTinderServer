import { Role } from '../../Entities/Mysql/Role';
import { mysqlDataSource } from '../data-sources';

export const roleRepo = mysqlDataSource.getRepository(Role).extend({
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
