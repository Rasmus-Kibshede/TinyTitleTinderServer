/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { UserRequestDTO } from '../DTO/userDTO';
import { User } from '../Entities/User';
import { appDataSource } from './data-source';

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
  // TODO: Code something useful here
  updateTablesForName(name: string) {
    return userRepo.manager.transaction(
      'SERIALIZABLE',
      async (manager) => {
      await manager.query('update user set name = ? where name = ?', [
        name,
        name,
      ]);
      await manager.query('update parent set name = ? where name = ?', [
        name,
        name,
      ]);
    });
  },
});

