import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Address } from '../Address';
import { ManyToOne } from 'typeorm';
import { LocationADT } from './LocationADT';

@AuditingEntity(Address, { name: 'adt_address' })
export class AddressADT extends Address implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToOne(() => LocationADT, (location) => location.streets)
    location: LocationADT;
}