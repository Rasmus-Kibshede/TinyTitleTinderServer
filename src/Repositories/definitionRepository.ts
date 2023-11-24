import { Definition } from '../Entities/Definition';
import { appDataSource } from './data-source';

export const definitionRepo = appDataSource.getRepository(Definition).extend({
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