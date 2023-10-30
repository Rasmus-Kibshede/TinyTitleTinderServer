import { Location } from '../Entities/Location';
import { appDataSource } from './data-source';

export const locationRepo = appDataSource.getRepository(Location).extend({
    findOneByID(id: number){
        return locationRepo.findOne({
            where: {
                locationId: id
            }
        });
    }
});