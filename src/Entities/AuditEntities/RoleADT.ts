import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Role } from '../Role';
import { UserADT } from './UserADT';
import { ManyToMany, JoinColumn } from 'typeorm';

@AuditingEntity(Role, { name: 'adt_role' })
export class RoleADT extends Role implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction.Update;
    readonly _modifiedAt!: Date;

    @ManyToMany(()=> UserADT, (user) => user.roles)
    @JoinColumn()
    users: UserADT[];
}