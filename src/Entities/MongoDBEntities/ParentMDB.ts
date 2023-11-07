import { Column, /*Entity, ObjectId, ObjectIdColumn*/ } from 'typeorm';
// import { UserMDB } from './UserMDB';
// import { NameMDB } from './NameMDB';
// import { FamilyMDB } from './FamilyMDB';
// import { LocationMDB } from './LocationMDB';

// @Entity({ database: 'test' })
export class ParentMDB {

    // @ObjectIdColumn({ name: 'parent_id' })
    // _id: ObjectId;

    @Column(/*'int', { name: 'age' }*/)
    age: number;

    @Column(/*'varchar', { length: 255, nullable: false, name: 'gender' }*/)
    gender: string;

    @Column(/*'varchar', { length: 255, nullable: false, name: 'first_name' }*/)
    firstName: string;

    @Column(/*'varchar', { length: 255, nullable: false, name: 'last_name' }*/)
    lastName: string;

    // @Column(() => UserMDB)
    // user: UserMDB;

    // @Column(() => NameMDB)
    // names: NameMDB[] | null;

    // @Column(() => FamilyMDB)
    // families: FamilyMDB[];

    // @Column(() => LocationMDB)
    // location: LocationMDB;
}
