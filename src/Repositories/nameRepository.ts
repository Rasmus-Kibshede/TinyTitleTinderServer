import { Name } from '../Entities/Name';
import { appDataSource } from './data-source';

export const nameRepo = appDataSource.getRepository(Name).extend({
  findOneByID(id: number) {
    return nameRepo.findOne({
      relations: {
        origins: true
      },
      where: {
        nameSuggestId: id,
      },
    });
  },
  findAll() {
    return nameRepo.find({
      relations: {
        origins: true,
      }
    });
  },
});
