import { Family } from '../../Entities/MysqlEntities/Family';
import { mysqlDataSource } from '../data-sources';

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