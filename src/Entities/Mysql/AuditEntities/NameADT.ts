// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Name } from '../Name';

@AuditingEntity(Name, { name: 'adt_name' })
export class NameADT extends Name implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;
}