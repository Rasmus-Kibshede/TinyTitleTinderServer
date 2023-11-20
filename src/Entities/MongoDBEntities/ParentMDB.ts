import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
} from 'typeorm';
import { LocationMDB } from './LocationMDB';
import { FamilyMDB } from './FamilyMDB';

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

