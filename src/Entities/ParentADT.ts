import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Parent } from './Parent';

@AuditingEntity(Parent, {name: 'adt_parent'})
export class ADTParent extends Parent implements AuditingEntityDefaultColumns{
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;
    
}