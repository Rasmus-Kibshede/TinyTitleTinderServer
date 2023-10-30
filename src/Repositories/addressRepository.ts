import { Address } from '../Entities/Address';
import { appDataSource } from './data-source';

export const addressRepo = appDataSource.getRepository(Address).extend({
    findOneByID(id: number){
        return addressRepo.findOne({
            where: {
                addressId: id
            }
        });
    }
});