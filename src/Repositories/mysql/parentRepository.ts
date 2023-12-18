/* eslint-disable camelcase */
import { Parent } from '../../Entities/Mysql/Parent';
import { mysqlDataSource } from '../data-source';

export const parentRepo = mysqlDataSource.getRepository(Parent).extend({
    findOneByID(id: number) {
        return parentRepo.findOne({
            where: {
                parentId: id
            },
            relations: {
                likedNames: true,
                dislikedNames: true,
                address: true,
                families: true
            }
        });
    },
    findAll() {
        return parentRepo.find({
            relations: {
                likedNames: true,
                families: true,
                address: true,
            }
        });
    },
    saveLikedDislikedNames(parentId: number, likedNames: number[], dislikedNames: number[]) {
        return parentRepo.manager.transaction(async transactionalEntityManager => {
          if (likedNames.length > 0) {
            await transactionalEntityManager
              .createQueryBuilder()
              .insert()
              .into('parent_name_suggest')
              .values(likedNames.map(nameSuggestId => ({
                fk_parent_id: parentId,
                fk_name_suggest_id: nameSuggestId
              })))
              .execute();
          }
      
          if (dislikedNames.length > 0) {
            await transactionalEntityManager
              .createQueryBuilder()
              .insert()
              .into('parent_name_suggest_dislike')
              .values(dislikedNames.map(nameSuggestId => ({
                fk_parent_id: parentId,
                fk_name_suggest_id: nameSuggestId
              })))
              .execute();
          }
        });
      }
});
