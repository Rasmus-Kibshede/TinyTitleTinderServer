import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Location } from '../Location';
import { OneToMany } from 'typeorm';
import { AddressADT } from './AddressADT';
import { ParentADT } from './ParentADT';

@AuditingEntity(Location, { name: 'adt_location' })
export class LocationADT extends Location implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @OneToMany(() => AddressADT, (address) => address.location)
    addresses: AddressADT[];

    @OneToMany(() => ParentADT, (parents) => parents.location)
    parents: ParentADT[];
}