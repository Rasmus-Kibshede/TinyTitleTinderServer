import { AddressRequestDTO } from '../DTO/addressDTO';
import { Address } from '../Entities/Address';
import { appDataSource } from './data-source';

export const addressRepo = appDataSource.getRepository(Address).extend({
    findOneById(id: number){
        return addressRepo.findOne({
            where: {
                addressId: id
            }
        });
    },
    findOneBy(addressRequestDTO: AddressRequestDTO){
        return addressRepo.findOne({
            where:{
                city: addressRequestDTO.city,
                zipcode: addressRequestDTO.zipcode,
                address: addressRequestDTO.address
            }
        });
    }
});