import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { User } from '../User';
import { BeforeInsert } from 'typeorm';
import { mysqlDataSource } from '../../../Repositories/data-source';

@AuditingEntity(User, { name: 'adt_user' })
export class UserADT extends User implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @BeforeInsert()
    dropFkParentId() {
        if (process.env.SYNCHRONIZE === 'true') {
            const queryRunner = mysqlDataSource.createQueryRunner();
            queryRunner.query('ALTER TABLE adt_user DROP COLUMN fk_parent_id;');
            queryRunner.query('ALTER TABLE adt_user ADD COLUMN fk_parent_id INT NULL;');
            queryRunner.release();
        }
    }
}