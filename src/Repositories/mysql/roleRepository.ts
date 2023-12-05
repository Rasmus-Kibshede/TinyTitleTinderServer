import { Role } from '../../Entities/MysqlEntities/Role';
import { mysqlDataSource } from '../data-sources';

export const roleRepo = mysqlDataSource.getRepository(Role).extend({
    findAll() {
        return roleRepo.find({
            select: {
                roleId: true,
                title: true,
                users: true
            },
            relations: {
                users: true
            },
        });
    },
    findOneByID(id: number) {
        return roleRepo.findOne({
            relations: {
            },
            where: {
                roleId: id
            }
        });
    }
});
