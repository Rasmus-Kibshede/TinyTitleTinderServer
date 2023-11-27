import { Location } from '../Entities/Location';
import { appDataSource } from './data-source';

export const locationRepo = appDataSource.getRepository(Location).extend({
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