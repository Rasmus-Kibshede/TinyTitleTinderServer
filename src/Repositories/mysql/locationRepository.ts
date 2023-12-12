import { Location } from '../../Entities/Mysql/Location';
import { mysqlDataSource } from '../data-sources';

export const locationRepo = mysqlDataSource.getRepository(Location).extend({
    findOneByID(id: number) {
        return locationRepo.findOne({
            relations: {
                addresses: true
            },
            where: {
                locationId: id
            }
        });
    },
    findAll() {
        return locationRepo.find({
            relations: {
                addresses: true
            },
        });
    }
});