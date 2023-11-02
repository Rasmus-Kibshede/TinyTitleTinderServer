import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Role } from './Role';

@AuditingEntity(Role, {name: 'adt_role'})
export class ADTRole extends Role implements AuditingEntityDefaultColumns{
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;
    
}