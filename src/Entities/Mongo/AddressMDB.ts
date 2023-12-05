import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
} from 'typeorm';
import { LocationMDB } from './LocationMDB';

// We cannot reference other tables using TypeOrm, like we see in the rleational migrator code generator or in the MongoDB documentation:
// https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/ 
// https://github.com/typeorm/typeorm/pull/9494 - this is a known issue
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
