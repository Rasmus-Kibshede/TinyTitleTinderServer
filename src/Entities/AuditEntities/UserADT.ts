// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { User } from '../User';
import { ManyToMany, JoinTable, Column } from 'typeorm';
import { RoleADT } from './RoleADT';

@AuditingEntity(User, { name: 'adt_user' })
export class UserADT extends User implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => RoleADT, (role) => role.users, { nullable: true })
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

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;
}