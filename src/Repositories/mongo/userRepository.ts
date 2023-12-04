import { UserMDB } from '../../Entities/MongoDBEntities/UserMDB';
import { mongoDataSource } from '../data-sources';

export const userRepoMDB = mongoDataSource.getMongoRepository(UserMDB).extend({
    findOneByID(id: number) {
        return userRepoMDB.findOne({
            where: {
                userId: id
            },
        });
    },
    findOneByEmail(email: string) {
        return userRepoMDB.findOne({
            where: {
                email: email
            },
        });
    },
    findOneByEmailAndPassword(email: string, password: string) {
        return userRepoMDB.findOne({
            where: {
                email: email,
                password: password
            },
        });
    },
    findAll() {
        return userRepoMDB.find();
    }
});