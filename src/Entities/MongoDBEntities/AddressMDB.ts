import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { LocationMDB } from './LocationMDB';

@Entity({ database: 'MongoDB_dbs' })
export class AddressMDB {

    @ObjectIdColumn({ name: 'address_id' })
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'city' })
    city: string;

    @Column('varchar', { length: 255, nullable: false, name: 'zipcode' })
    zipcode: string;

    @Column('varchar', { length: 255, nullable: false, name: 'address' })
    address: string;

    @Column()
    location: LocationMDB['_id'];
}
