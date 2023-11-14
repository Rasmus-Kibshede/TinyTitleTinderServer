/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { RoleMDB } from './RoleMDB';
import { ParentMDB } from './ParentMDB';

//TODO: Fix adding default values for columns
@Entity()
export class UserMDB {

    @ObjectIdColumn({ name: 'user_id' })
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'email', unique: true })
    email: string;

    @Column('varchar', { length: 255, nullable: false, name: 'password' })
    password: string;

    @Column('boolean', { nullable: false, name: 'user_active', default: true })
    userActive: boolean = true;

    @CreateDateColumn({ nullable: false, name: 'created_at' })
    createdAt: Date;

    @Column('datetime', { nullable: true, name: 'last_login', default: null })
    lastLogin: Date | null = null;

    // eslint-disable-next-line no-unused-vars
    @Column(() => RoleMDB)
    roles: RoleMDB[];

    // eslint-disable-next-line no-unused-vars
    @Column((type) => ParentMDB)
    parent: ParentMDB;
}
