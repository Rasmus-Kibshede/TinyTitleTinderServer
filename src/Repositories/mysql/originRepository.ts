import { Origin } from '../../Entities/Origin';
import { mysqlDataSource } from '../data-sources';

export const originRepo = mysqlDataSource.getRepository(Origin).extend({
    findOneByID(id: number) {
        return originRepo.findOne({
            where: {
                originId: id
            }
        });
    },
    findAll() {
        return originRepo.find();
    }
});