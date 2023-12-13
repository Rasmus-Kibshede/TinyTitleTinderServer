// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { User } from '../User';
import { Column, BeforeInsert, JoinColumn, JoinTable, ManyToMany } from 'typeorm';
import { mysqlDataSource } from '../../../Repositories/data-source';
import { RoleADT } from './RoleADT';

@AuditingEntity(User, { name: 'adt_user' })
export class UserADT extends User implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => RoleADT, (role) => role.users, { nullable: true })
    @JoinColumn()
    @JoinTable({
        name: 'adt_user_role',
        joinColumn: {
            name: 'fk_user_id',
            referencedColumnName: 'userId'
        },
        inverseJoinColumn: {
            name: 'fk_role_id',
            referencedColumnName: 'roleId'
        }
    })
    roles: RoleADT[] | null;

    @BeforeInsert()
    dropFkParentId() {
        if (process.env.SYNCHRONIZE === 'true') {
            const queryRunner = mysqlDataSource.createQueryRunner();
            queryRunner.query('ALTER TABLE adt_user DROP COLUMN fk_parent_id;');
            queryRunner.query('ALTER TABLE adt_user ADD COLUMN fk_parent_id INT NULL;');
            queryRunner.release();
        }
    }

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;
}