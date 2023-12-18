import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Role {

    @PrimaryGeneratedColumn({ name: 'role_id' })
    roleId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'title', unique: true })
    title: string;

    @ManyToMany(()=> User, (user) => user.roles)
    @JoinColumn()
    users: User[];
}