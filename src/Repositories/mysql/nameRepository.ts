import { Name } from '../../Entities/Mysql/Name';
import { mysqlDataSource } from '../data-sources';
import { NameRequestDTO } from '../../DTO/nameDTO';

export const nameRepo = mysqlDataSource.getRepository(Name).extend({
  createName(nameRequestDTO: NameRequestDTO) {
    return this.save(nameRequestDTO);
  },
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
      },
    });
  },
  findNamesByParentId(parentId: number) {
    return nameRepo.query('call GetNamesOriginsDefinitionsByParentId(?)', [
      parentId,
    ]);
  },
  findDislikedNamesByParentId(parentId: number) {
    return nameRepo.query(
      'call GetDislikedNamesOriginsDefinitionsByParentId(?)',
      [parentId]
    );
  },
  findParentlessNames(parentId: number) {
    return nameRepo.query('call GetNamesWithNoParentRelation(?)', [parentId]);
  },
});
