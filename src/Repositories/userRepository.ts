/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { UserRequestDTO } from '../DTO/userDTO';
import { User } from '../Entities/User';
import { appDataSource } from './data-source';

export const userRepo = appDataSource.getRepository(User).extend({
    findOneByID(id: number) {
        return userRepo.findOne({
            relations: {
                roles: true
            },
            where: {
                userId: id
            },
        });
    },
    findOneByEmail(email: string) {
        return userRepo.findOne({
            relations: {
                roles: true
            },
            where: {
                email: email
            },
        });
    },
    findOneByEmailAndPassword(email: string, password: string) {
        return userRepo.findOne({
            relations: {
                roles: true
            },
            where: {
                email: email,
                password: password
            },
        });
    },
    findAll() {
        return userRepo.find({
            relations: {
                roles: true
            },
        });
    },
    //stored procedure
    signUp(params: unknown[]) { //userRequestDTO: UserRequestDTO
        return userRepo.query('call CreateUserWithRoleAndLocation(?,?,?,?,?,?,?,?,?,?)',params /*[
            userRequestDTO.email,
            userRequestDTO.password,
            userRequestDTO.parent?.age,
            userRequestDTO.parent?.gender,
            userRequestDTO.parent?.firstName,
            userRequestDTO.parent?.lastName,
            userRequestDTO.parent?.address.location?.locationId,
            userRequestDTO.parent?.address.city,
            userRequestDTO.parent?.address.zipcode,
            userRequestDTO.parent?.address.address
        ]*/);
    }
});

