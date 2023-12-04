import { Parent } from '../../Entities/Parent';
import { mysqlDataSource } from '../data-sources';

export const parentRepo = mysqlDataSource.getRepository(Parent).extend({
    findOneByID(id: number) {
        return parentRepo.findOne({
            where: {
                parentId: id
            },
            relations: {
                address: true,
                families: true
            }
        });
    },
    findAll() {
        return parentRepo.find({
            relations: {
                names: true,
                families: true,
                address: true,
            }
        });
    }
});
