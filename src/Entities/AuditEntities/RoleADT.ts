import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Role } from '../Role';

@AuditingEntity(Role, { name: 'adt_role' })
export class RoleADT extends Role implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction.Update;
    readonly _modifiedAt!: Date;
}