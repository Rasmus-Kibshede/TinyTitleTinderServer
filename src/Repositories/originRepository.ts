import { Origin } from '../Entities/Origin';
import { appDataSource } from './data-source';

export const originRepo = appDataSource.getRepository(Origin).extend({
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