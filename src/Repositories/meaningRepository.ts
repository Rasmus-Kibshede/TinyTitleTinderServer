import { Meaning } from '../Entities/Meaning';
import { appDataSource } from './data-source';

export const meaningRepo = appDataSource.getRepository(Meaning).extend({
    findOneByID(id: number) {
        return meaningRepo.findOne({
            relations: {
                names: true
            },
            where: {
                meaningId: id,
            },
        });
    },
    findAll() {
        return meaningRepo.find({
            relations: {
                names: true
            }
        });
    },
});