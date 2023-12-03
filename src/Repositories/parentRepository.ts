import { Parent } from '../Entities/Parent';
import { appDataSource } from './data-source';

export const parentRepo = appDataSource.getRepository(Parent).extend({
    findOneByID(id: number) {
        return parentRepo.findOne({
            where: {
                parentId: id
            },
            relations: {
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
    updateTablesForName(parentId: number, likedNames: number[], dislikedNames: number[]) {
        return parentRepo.manager.transaction(
            'SERIALIZABLE',
            async (manager) => {
                await Promise.all(likedNames.map(async (nameSuggestId) => {
                    await manager.query('INSERT INTO parent_name_suggest (fk_parent_id, fk_name_suggest_id) VALUES (?, ?)', [
                        parentId,
                        nameSuggestId,
                    ]);
                }));
                await Promise.all(dislikedNames.map(async (nameSuggestId) => {
                    await manager.query('INSERT INTO parent_name_suggest_dislike (fk_parent_id, fk_name_suggest_id) VALUES (?, ?)', [
                        parentId,
                        nameSuggestId,
                    ]);
                }));
            }
        );
    }
});
