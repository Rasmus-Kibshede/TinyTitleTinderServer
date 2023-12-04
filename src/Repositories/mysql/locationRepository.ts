import { Location } from '../../Entities/Location';
import { mysqlDataSource } from '../data-sources';

export const locationRepo = mysqlDataSource.getRepository(Location).extend({
    findOneByID(id: number){
        return locationRepo.findOne({
            relations: {
                streets: true
            },
            where: {
                locationId: id
            }
        });
    },
    findAll() {
        return locationRepo.find({
            relations: {
                streets: true
            },
        });
    }    
});