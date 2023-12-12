import { User } from '../../Entities/Mysql/User';
import { mysqlDataSource } from './data-sources';

export const userRepo = mysqlDataSource.getRepository(User).extend({
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
