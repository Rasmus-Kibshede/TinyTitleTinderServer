import { Address } from '../Entities/Address';
import { Parent } from '../Entities/Parent';
import { User } from '../Entities/User';
import { appDataSource } from './data-source';
import { parentRepo } from './parentRepository';

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
  signUpTransaction(parent: Parent, user: User, address: Address) {
    return parentRepo.manager.transaction(
      'SERIALIZABLE',
      async (manager) => {
        await manager.save(address);
        await manager.save(parent);
        await manager.save(user);
      }
    );
  }
});
