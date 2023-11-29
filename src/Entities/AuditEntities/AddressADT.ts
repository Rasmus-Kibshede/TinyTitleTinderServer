/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Address } from '../Address';
import { JoinColumn, ManyToOne } from 'typeorm';
import { LocationADT } from './LocationADT';

@AuditingEntity(Address, { name: 'adt_address' })
export class AddressADT extends Address implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    // @ManyToOne(() => LocationADT, (location) => location.streets)
    // @JoinColumn({ name: 'fk_location_id', referencedColumnName: 'locationId' })
    // location: LocationADT;
}