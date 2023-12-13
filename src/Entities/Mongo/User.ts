import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
    CreateDateColumn,
} from 'typeorm';

// We cannot reference other tables using TypeOrm, like we see in the rleational migrator code generator or in the MongoDB documentation:
// https://www.mongodb.com/docs/manual/tutorial/model-referenced-one-to-many-relationships-between-documents/ 
// https://github.com/typeorm/typeorm/pull/9494 - this is a known issue
@Entity({ name: 'user' })
export class User {
    
    @ObjectIdColumn()
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'email', unique: true })
    email: string;

    @Column('varchar', { length: 255, nullable: false, name: 'password' })
    password: string;

    // Working with mongoDB and typeorm, default doesn't actually save the value in the database, but shows when using the entity through a fetch endpoint
    // https://github.com/typeorm/typeorm/issues/3799 - this is a known issue - which mean we have to set it manually in the servicelayer
    @Column('boolean', { default: true })
    userActive = true;

    @CreateDateColumn({ nullable: false, name: 'created_at' })
    createdAt: Date;

    @Column('datetime', { nullable: true, name: 'last_login' })
    lastLogin: Date;

    @Column(() => UserRolesInner)
    roles: UserRolesInner[];
}

export class UserRolesInner {

    @Column()
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}
