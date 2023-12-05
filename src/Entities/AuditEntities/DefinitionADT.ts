import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Definition } from '../Mysql/Definition';

@AuditingEntity(Definition, { name: 'adt_definition' })
export class DefinitionADT extends Definition implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

}