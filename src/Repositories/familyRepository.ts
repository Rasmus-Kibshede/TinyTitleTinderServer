import { Family } from '../Entities/Family';
import { appDataSource } from './data-source';

export const parentRepo = appDataSource.getRepository(Family).extend({
    findOneByID(id: number) {
        return parentRepo.findOne({
            where: {
                familyId: id
            },
            relations: {
            }
        });
    },
    findAll() {
        return parentRepo.find({
            relations: {
            },
        });
    }
});