import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './Role';

@Entity()
export class User {

    @PrimaryGeneratedColumn({ name: 'user_id' })
    userId: number;

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

    @ManyToMany(() => Role, (role) => role.users, { nullable: true })
    @JoinColumn()
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