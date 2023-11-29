/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Role } from '../Role';
import { JoinColumn, ManyToMany } from 'typeorm';
import { UserADT } from './UserADT';

@AuditingEntity(Role, { name: 'adt_role' })
export class RoleADT extends Role implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction.Update;
    readonly _modifiedAt!: Date;

    // @ManyToMany(() => UserADT, (user) => user.roles)
    // @JoinColumn()
    // users: UserADT[];

}