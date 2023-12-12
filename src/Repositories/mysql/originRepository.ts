import { Origin } from '../../Entities/Mysql/Origin';
import { mysqlDataSource } from './data-sources';

export const originRepo = mysqlDataSource.getRepository(Origin).extend({
    findOneByID(id: number) {
        return originRepo.findOne({
            where: {
                originId: id
            },
            relations: {
                definition: true
            }
        });
    },
    findAll() {
        return originRepo.find({
            relations: {
                definition: true
            }
        });
    }
});