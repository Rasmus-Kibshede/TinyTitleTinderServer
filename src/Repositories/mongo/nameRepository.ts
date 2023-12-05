import { Name } from '../../Entities/Mongo/Name';
import { mongoDataSource } from '../data-sources';

export const nameRepo = mongoDataSource.getRepository(Name).extend({
//   findOneByID(id: number) {
//     return nameRepo.findOne({
//       relations: {
//         origins: true,
//         parents: true,
//       },
//       where: {
//         nameSuggestId: id,
//       },
//     });
//   },
//   findAll() {
//     return nameRepo.find({
//       relations: {
//         origins: true,
//         parents: true,
//       }
//     });
//   },
//   findNamesByParentId(parentId: number) {
//     return nameRepo.query('call GetNamesOriginsDefinitionsByParentId(?)', [parentId]);
//   },
//   findDislikedNamesByParentId(parentId: number) {
//     return nameRepo.query('call GetDislikedNamesOriginsDefinitionsByParentId(?)', [parentId]);
//   },
//   findParentlessNames(parentId: number){
//     return nameRepo.query('call GetNamesWithNoParentRelation(?)', [parentId]);
//   }
});
