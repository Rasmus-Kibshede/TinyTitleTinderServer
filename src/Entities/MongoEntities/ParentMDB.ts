import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
} from 'typeorm';
import { LocationMDB } from './LocationMDB';
import { FamilyMDB } from './FamilyMDB';

// We cannot reference other tables using TypeOrm, like we see in the rleational migrator code generator or in the MongoDB documentation:
// https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/ 
// https://github.com/typeorm/typeorm/pull/9494 - this is a known issue
@Entity({ name: 'parent' })
export class ParentMDB {
    
    @ObjectIdColumn()
    _id: ObjectId;

    @Column('int', { name: 'age' })
    age: number;

    @Column('varchar', { length: 255, nullable: false, name: 'gender' })
    gender: string;

    @Column('varchar', { length: 255, nullable: false, name: 'first_name' })
    firstName: string;

    @Column('varchar', { length: 255, nullable: false, name: 'last_name' })
    lastName: string;

    @Column(() => LocationMDB)
    location: LocationMDB;

    @Column(() => FamilyMDB)
    families: FamilyMDB[];
}

