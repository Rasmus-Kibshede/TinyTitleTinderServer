/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { User } from '../User';
import { ManyToMany, JoinTable, Column, JoinColumn, OneToOne, BeforeInsert, AfterLoad, AfterInsert, AfterUpdate, BeforeUpdate } from 'typeorm';
import { RoleADT } from './RoleADT';
import { ParentADT } from './ParentADT';
import { appDataSource } from '../../Repositories/data-source';

@AuditingEntity(User, { name: 'adt_user' })
export class UserADT extends User implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    // @AfterInsert()
    // dropFkParentId() {
    //     const queryRunner = appDataSource.createQueryRunner();
    //     queryRunner.query('ALTER TABLE adt_user DROP COLUMN fk_parent_id;');
    // }

    // @AfterUpdate()
    // dropFkParentId2() {
    //     return 'ALTER TABLE adt_user DROP COLUMN fk_parent_id;';
    // }

    // @BeforeUpdate()
    // dropFkParentId3() {
    //     return 'ALTER TABLE adt_user DROP COLUMN fk_parent_id;';
    // }

    @BeforeInsert()
    dropFkParentId1() {
        const queryRunner = appDataSource.createQueryRunner();
        queryRunner.query('ALTER TABLE adt_user DROP COLUMN fk_parent_id;');
        queryRunner.query('ALTER TABLE adt_user ADD COLUMN fk_parent_id INT NULL;');
        queryRunner.release();
    }


    // @OneToOne(() => ParentADT)
    // @JoinColumn({ name: 'fk_parent_id' })
    // parent: ParentADT;

    // @ManyToMany(() => RoleADT, (role) => role.users, { nullable: true })
    // @JoinTable({
    //     name: 'adt_user_role',
    //     joinColumn: {
    //         name: 'fk_user_id',
    //         referencedColumnName: 'userId'
    //     },
    //     inverseJoinColumn: {
    //         name: 'fk_role_id',
    //         referencedColumnName: 'roleId'
    //     }
    // })
    // roles: RoleADT[] | null;

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;
}