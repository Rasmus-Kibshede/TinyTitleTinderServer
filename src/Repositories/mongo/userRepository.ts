import { UserMDB } from '../../Entities/MongoEntities/UserMDB';
import { mongoDataSource } from '../data-sources';

export const userRepoMDB = mongoDataSource.getMongoRepository(UserMDB).extend({
  findOneUser(email: string | number) {
    return userRepoMDB.findOne({
      where: {
        email: email.toString(),
      },
    });
  },
  findOneByEmail(email: string) {
    return userRepoMDB.findOne({
      where: {
        email: email,
      },
    });
  },
  findOneByEmailAndPassword(email: string, password: string) {
    return userRepoMDB.findOne({
      where: {
        email: email,
        password: password,
      },
    });
  },
  findAll() {
    return userRepoMDB.find();
  },
});
