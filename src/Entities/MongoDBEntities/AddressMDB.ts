import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
} from 'typeorm';
import { LocationMDB } from './LocationMDB';

@Entity({ name: 'address' })
export class AddressMDB {
    
    @ObjectIdColumn()
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'city' })
    city: string;

    @Column('varchar', { length: 255, nullable: false, name: 'zipcode' })
    zipcode: string;

    @Column('varchar', { length: 255, nullable: false, name: 'address' })
    address: string;

    @Column(() => LocationMDB)
    location: LocationMDB;
}
