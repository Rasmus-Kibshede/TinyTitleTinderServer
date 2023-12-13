import { User } from '../../Entities/Mongo/User';
import { mongoDataSource } from '../data-source';

export const userRepoMDB = mongoDataSource.getMongoRepository(User).extend({
  // For dynamic datasorce v2
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
