import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { AddressMDB } from './AddressMDB';
import { ParentMDB } from './ParentMDB';

@Entity()
export class LocationMDB {
    @ObjectIdColumn({ name: 'location_id' })
    locationId: ObjectId;

    @Column('varchar',{ length: 255, nullable: false, name: 'country' })
    country: string;

    @Column()
    addresses: AddressMDB[];

    @Column()
    parents: ParentMDB[];

    // @OneToMany(() => AddressMDB, (address) => address.location)
    // addresses: AddressMDB[];

    // @OneToMany(() => ParentMDB, (parents) => parents.location)
    // parents: ParentMDB[];
}


