import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Role } from '../Role';
import { ManyToMany } from 'typeorm';
import { ADTUser } from './UserADT';

@AuditingEntity(Role, { name: 'adt_role' })
export class ADTRole extends Role implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction.Update;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => ADTUser, (user) => user.roles)
    users: ADTUser[];

}