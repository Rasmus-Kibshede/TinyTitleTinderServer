/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Role } from '../Entities/Role';
import { appDataSource } from './data-source';

export const roleRepo = appDataSource.getRepository(Role).extend({
    findAll() {
        return roleRepo.find({
            select: {
                roleId: true,
                title: true,
                users: true
            },
            relations: {
                users: true
            },
        });
    }
});