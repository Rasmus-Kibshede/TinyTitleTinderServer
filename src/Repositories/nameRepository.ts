import { Name } from '../Entities/Name';
import { appDataSource } from './data-source';

export const nameRepo = appDataSource.getRepository(Name).extend({
    findOneByID(id: number) {
        return nameRepo.findOne({
            where: {
                nameSuggestId: id
            }
        });
    },
    findAll() {
        return nameRepo.find();
    }
});