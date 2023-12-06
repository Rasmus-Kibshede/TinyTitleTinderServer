import { Name } from '../../Entities/Mysql/Name';
import { mysqlDataSource } from '../data-sources';
import { NameRequestDTO, NameResponseDTO } from '../../DTO/nameDTO';
import { failed } from '../../Utils/errorHandler';

export const nameRepo = mysqlDataSource.getRepository(Name).extend({
  async createName(nameRequestDTO: NameRequestDTO) {
    return convertToDTO(await this.save(nameRequestDTO));
  },
  async findOneByID(id: number) {
    return convertToDTO(
      await this.findOne({
        relations: {
          origins: true,
          parents: true,
        },
        where: {
          nameSuggestId: id,
        },
      })
    );
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

const convertToDTO = (name: Name | null) => {
  if (!name) return failed('name');

  const dto: NameResponseDTO = {
    nameSuggestId: name.nameSuggestId,
    nameSuggestName: name.nameSuggestName,
    gender: name.gender,
    popularity: Number(name.popularity),
    nameDays: name.nameDays,
    namesakes: name.namesakes,
    origins: name.origins,
  };
  return dto;
};
