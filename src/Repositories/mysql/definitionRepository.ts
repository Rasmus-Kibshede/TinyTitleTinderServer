import { Definition } from '../../Entities/Mysql/Definition';
import { mysqlDataSource } from '../data-source';

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