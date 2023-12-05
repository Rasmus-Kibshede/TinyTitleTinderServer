import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Role } from '../Mysql/Role';
import { ManyToMany } from 'typeorm';
import { UserADT } from './UserADT';

@AuditingEntity(Role, { name: 'adt_role' })
export class RoleADT extends Role implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction.Update;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => UserADT, (user) => user.roles)
    users: UserADT[];

}