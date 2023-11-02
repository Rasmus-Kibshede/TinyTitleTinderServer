import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Location } from './Location';

@AuditingEntity(Location, {name: 'adt_location'})
export class ADTLocation extends Location implements AuditingEntityDefaultColumns{
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;
    
}