/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, CreateDateColumn, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { RoleMDB } from './RoleMDB';
import { ParentMDB } from './ParentMDB';

@Entity({ database: 'test' })
export class UserMDB {

    @ObjectIdColumn({ name: 'user_id' })
    userId: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'email', unique: true })
    email: string;

    @Column('varchar', { length: 255, nullable: false, name: 'password' })
    password: string;

    @Column('boolean', { nullable: false, name: 'user_active', default: true })
    userActive: boolean;

    @CreateDateColumn({ nullable: false, name: 'created_at' })
    createdAt: Date;

    @Column('datetime', { nullable: true, name: 'last_login' })
    lastLogin: Date | null;

    // eslint-disable-next-line no-unused-vars
    @Column((type) => RoleMDB)
    roles: RoleMDB[];

    // eslint-disable-next-line no-unused-vars
    @Column((type) => ParentMDB)
    parent: ParentMDB;
}
