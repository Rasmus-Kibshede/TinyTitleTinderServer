import { Address } from '../../Entities/Mysql/Address';
import { mysqlDataSource } from '../data-source';

export const addressRepo = mysqlDataSource.getRepository(Address).extend({
    findOneByID(id: number){
        return addressRepo.findOne({
            relations: {
                location: true
            },
            where: {
                addressId: id
            }
        });
    },
    findAll(){
        return addressRepo.find({
            relations: {
                location: true,
            }
        });
    }
});