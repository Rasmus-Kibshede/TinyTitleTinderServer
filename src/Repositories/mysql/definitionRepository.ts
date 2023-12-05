import { Definition } from '../../Entities/MysqlEntities/Definition';
import { mysqlDataSource } from '../data-sources';

export const definitionRepo = mysqlDataSource.getRepository(Definition).extend({
    findOneByID(id: number) {
        return definitionRepo.findOne({
            where: {
                definitionId: id,
            },
        });
    },
    findAll() {
        return definitionRepo.find({
        });
    },
});