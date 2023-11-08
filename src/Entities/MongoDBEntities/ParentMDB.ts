import { Column, /*Entity, ObjectId, ObjectIdColumn*/ } from 'typeorm';

export class ParentMDB {

    @Column(/*'int', { name: 'age' }*/)
    age: number;

    @Column(/*'varchar', { length: 255, nullable: false, name: 'gender' }*/)
    gender: string;

    @Column(/*'varchar', { length: 255, nullable: false, name: 'first_name' }*/)
    firstName: string;

    @Column(/*'varchar', { length: 255, nullable: false, name: 'last_name' }*/)
    lastName: string;

    constructor(age: number, gender: string, firstName: string, lastName: string) {
        this.age = age;
        this.gender = gender;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // @Column(() => UserMDB)
    // user: UserMDB;

    // @Column(() => NameMDB)
    // names: NameMDB[] | null;

    // @Column(() => FamilyMDB)
    // families: FamilyMDB[];

    // @Column(() => LocationMDB)
    // location: LocationMDB;
}
