import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @Column('datetime', { nullable: false, name: 'last_login' })
    lastLogin: Date;

    @ManyToMany(() => Role, (role) => role.users)
    @JoinTable()
    roles: Role[];
}