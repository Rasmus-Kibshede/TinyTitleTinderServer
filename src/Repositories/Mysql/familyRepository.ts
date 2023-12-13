import { Family } from '../../Entities/Mysql/Family';
import { mysqlDataSource } from '../data-source';

export const parentRepo = mysqlDataSource.getRepository(Family).extend({
    findOneByID(id: number) {
        return parentRepo.findOne({
            where: {
                familyId: id
            },
            relations: {
                parents: true
            }
        });
    },
    findAll() {
        return parentRepo.find({
            relations: {
                parents: true
            },
        });
    }
});