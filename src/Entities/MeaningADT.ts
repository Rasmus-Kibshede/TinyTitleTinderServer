import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Meaning } from './Meaning';

@AuditingEntity(Meaning, {name: 'adt_meaning'})
export class ADTMeaning extends Meaning implements AuditingEntityDefaultColumns{
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;
    
}