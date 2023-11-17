import {
    Entity,
    ObjectIdColumn,
    ObjectId,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserMDB {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'email', unique: true })
    email: string;

    @Column('varchar', { length: 255, nullable: false, name: 'password' })
    password: string;

    // Working with mongoDB and typeorm, default doesn't actually save the value in the database, but shows when using the entity through a fetch endpoint
    // https://github.com/typeorm/typeorm/issues/3799 - this is a known issue
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
