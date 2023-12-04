/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { UserMDB } from '../Entities/MongoDBEntities/UserMDB';
import { User } from '../Entities/User';
import { appDataSource, appDataSourceMongo } from './data-source';

export const userRepo = appDataSource.getRepository(User).extend({
  findOneByID(id: number) {
    return userRepo.findOne({
      relations: {
        roles: true,
      },
      where: {
        userId: id,
      },
    });
  },
  findOneByEmail(email: string) {
    return userRepo.findOne({
      where: {
        email: email,
      },
      relations: {
        parent: true,
      },
    });
  },
  updateLastLogin(email: string) {
    return userRepo.update(
      {
        email: email,
      },
      {
        lastLogin: new Date(),
      }
    );
  },
  findAll() {
    return userRepo.find({
      relations: {
        roles: true,
      },
    });
  },
  //stored procedure
  signUp(params: unknown[]) {
    return userRepo.query(
      'call CreateUserWithRoleAndLocation(?,?,?,?,?,?,?,?,?,?)',
      params
    );
  },
});

export const userRepoMDB = appDataSourceMongo.getMongoRepository(UserMDB).extend({
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