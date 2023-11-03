// TODO: Find solution for auditing user entity
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { User } from '../User';
import { ManyToMany, JoinTable } from 'typeorm';
import { ADTRole } from './RoleADT';

@AuditingEntity(User, { name: 'adt_user' })
export class ADTUser extends User implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => ADTRole, (role) => role.users, { nullable: true })
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
    roles: ADTRole[] | null;

}