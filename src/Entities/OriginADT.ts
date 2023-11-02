import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Origin } from './Origin';

@AuditingEntity(Origin, {name: 'adt_origin'})
export class ADTOrigin extends Origin implements AuditingEntityDefaultColumns{
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;
    
}