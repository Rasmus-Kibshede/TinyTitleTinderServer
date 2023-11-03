import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Address } from '../Address';
import { ManyToOne } from 'typeorm';
import { ADTLocation } from './LocationADT';

@AuditingEntity(Address, { name: 'adt_address' })
export class ADTAddress extends Address implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToOne(() => ADTLocation, (location) => location.addresses)
    location: ADTLocation;
}