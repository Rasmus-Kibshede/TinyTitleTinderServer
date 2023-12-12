import { Address } from '../Entities/Address';
import { Parent } from '../Entities/Parent';
import { User } from '../Entities/User';
import { appDataSource } from './data-source';

export const parentRepo = appDataSource.getRepository(Parent).extend({
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
        return parentRepo.manager.transaction(
            'READ UNCOMMITTED',
            async (transactionalEntityManager) => {
                if (likedNames.length > 0) {
                    const likedValues = likedNames.map(nameSuggestId => `(${parentId}, ${nameSuggestId})`).join(', ');
                    await transactionalEntityManager.query(`INSERT INTO parent_name_suggest (fk_parent_id, fk_name_suggest_id) VALUES ${likedValues}`);
                }
                if (dislikedNames.length > 0) {
                    const dislikedValues = dislikedNames.map(nameSuggestId => `(${parentId}, ${nameSuggestId})`).join(', ');
                    await transactionalEntityManager.query(`INSERT INTO parent_name_suggest_dislike (fk_parent_id, fk_name_suggest_id) VALUES ${dislikedValues}`);
                }
            }
        );
    },
    signup(parent: Parent, user: User, address: Address) {
        return parentRepo.manager.transaction(
            'SERIALIZABLE',
            async (manager) => {
                await manager.save(address);
                await manager.save(parent);
                await manager.save(user);
            }
        );
    }
});
