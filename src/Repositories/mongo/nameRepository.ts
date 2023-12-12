import { Name } from '../../Entities/Mongo/Name';
import { mongoDataSource } from '../data-sources';
import { NameRequestDTO } from '../../DTO/nameDTO';

export const nameRepo = mongoDataSource.getMongoRepository(Name).extend({
  getAllNames() {
    return this.find({});
  },
  findOneByName(nameRequestDTO: NameRequestDTO) {
    return this.findOneBy({ nameSuggestName: nameRequestDTO.nameSuggestName });
  },
  createOneName(nameRequestDTO: NameRequestDTO) {
    return this.save(nameRequestDTO);
  },
});
