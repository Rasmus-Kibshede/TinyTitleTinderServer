/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Parent } from '../Entities/Parent';
import { appDataSource } from './data-source';

export const parentRepo = appDataSource.getRepository(Parent).extend({
    findOneByID(id: number) {
         return parentRepo.findOne({
            relations: {
            },
            where: {
                parentId: id
            },
        });
    },
    findAll() {
        return parentRepo.find({
           relations: {
           },
       });
   }
});

