import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'email' })
    email: string;

    @Column('varchar', { length: 255, nullable: false, name: 'password' })
    password: string;

    @Column('tinyint', { nullable: false, name: 'user_active' })
    userActive: boolean;

    @Column('datetime', { nullable: false, name: 'created_at' })
    createdAt: string;

    @Column('datetime', { nullable: false, name: 'last_login' })
    lastLogin: string;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];
}