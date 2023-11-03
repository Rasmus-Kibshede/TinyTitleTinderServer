import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Location } from '../Location';
import { OneToMany } from 'typeorm';
import { ADTAddress } from './AddressADT';
import { ADTParent } from './ParentADT';

@AuditingEntity(Location, { name: 'adt_location' })
export class ADTLocation extends Location implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @OneToMany(() => ADTAddress, (address) => address.location)
    addresses: ADTAddress[];

    @OneToMany(() => ADTParent, (parents) => parents.location)
    parents: ADTParent[];
}