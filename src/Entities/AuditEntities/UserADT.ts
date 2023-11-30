// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { User } from '../User';
import { Column, BeforeInsert } from 'typeorm';
import { appDataSource } from '../../Repositories/data-source';

@AuditingEntity(User, { name: 'adt_user' })
export class UserADT extends User implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @BeforeInsert()
    dropFkParentId() {
        if (process.env.SYNCHRONIZE === 'true') {
            const queryRunner = appDataSource.createQueryRunner();
            queryRunner.query('ALTER TABLE adt_user DROP COLUMN fk_parent_id;');
            queryRunner.query('ALTER TABLE adt_user ADD COLUMN fk_parent_id INT NULL;');
            queryRunner.release();
        }
    }

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;
}