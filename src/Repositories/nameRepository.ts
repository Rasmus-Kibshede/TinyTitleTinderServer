import { Name } from '../Entities/Name';
import { appDataSource } from './data-source';

export const nameRepo = appDataSource.getRepository(Name).extend({
  findOneByID(id: number) {
    return nameRepo.findOne({
      relations: {
        origins: true,
        parents: true,
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
        parents: true,
      }
    });
  },
  findNamesByParentId(parentId: number) {
    return nameRepo.query('call GetNamesOriginsDefinitionsByParentId(?)', [parentId]);
  },
  findDislikedNamesByParentId(parentId: number) {
    return nameRepo.query('call GetDislikedNamesOriginsDefinitionsByParentId(?)', [parentId]);
  },
  findNamesNoRelation(parentId: number){
    return nameRepo.query('call GetNamesWithNoParentRelation(?)', [parentId]);
  }
});
