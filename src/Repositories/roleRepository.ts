import { ObjectId } from 'mongodb';
import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';
import { Role } from '../Entities/Role';
import { appDataSource, appDataSourceMongo } from './data-source';

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
    },
    findOneByID(id: number) {
        return roleRepo.findOne({
            relations: {
                users: true
            },
            where: {
                roleId: id
            }
        });
    }
});

export const roleRepoMDB = appDataSourceMongo.getMongoRepository(RoleMDB).extend({
    findAll() {
        return roleRepoMDB.find();
    },
    findOneByTitle(title: string) {
        return roleRepoMDB.findOne({
            where: {
                title: title
            }
        });
    },
    findOneByID(id: ObjectId) {
        return roleRepoMDB.findOne({
            where: {
                _id: id
            }
        });
    }
});