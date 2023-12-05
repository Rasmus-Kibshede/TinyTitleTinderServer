import { Parent } from '../../Entities/Mysql/Parent';
import { mysqlDataSource } from '../data-sources';

export const parentRepo = mysqlDataSource.getRepository(Parent).extend({
  findOne(id: number | string) {
    return parentRepo.findOne({
      where: {
        parentId: Number(id),
      },
      relations: {
        address: true,
        families: true,
      },
    });
  },
  findAll() {
    return parentRepo.find({
      relations: {
        names: true,
        families: true,
        address: true,
      },
    });
  },
});
