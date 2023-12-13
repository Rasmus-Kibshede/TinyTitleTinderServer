import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
} from 'typeorm';
import { Location } from './Location';
import { Family } from './Family';

// We cannot reference other tables using TypeOrm, like we see in the rleational migrator code generator or in the MongoDB documentation:
// https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/ 
// https://github.com/typeorm/typeorm/pull/9494 - this is a known issue
@Entity({ name: 'parent' })
export class Parent {
    
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

    @Column(() => Location)
    location: Location;

    @Column(() => Family)
    families: Family[];
}

