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

    @Column('boolean', { nullable: false, name: 'user_active', default: true })
    userActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date | null;

    @Column('datetime', { nullable: true, name: 'last_login' })
    lastLogin: Date | null;

    @ManyToMany(() => Role, (role) => role.users, { nullable: true })
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'fk_user_id',
            referencedColumnName: 'userId'
        },
        inverseJoinColumn: {
            name: 'fk_role_id',
            referencedColumnName: 'roleId'
        }
    })
    roles: Role[] | null;
}