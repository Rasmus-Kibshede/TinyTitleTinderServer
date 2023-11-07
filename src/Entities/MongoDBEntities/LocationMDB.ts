import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { AddressMDB } from './AddressMDB';
import { ParentMDB } from './ParentMDB';

@Entity({ database: 'test' })
export class LocationMDB {

    @ObjectIdColumn({ name: 'location_id' })
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'country' })
    country: string;

    @Column()
    addresses: AddressMDB[];

    @Column()
    parents: ParentMDB[];
}
