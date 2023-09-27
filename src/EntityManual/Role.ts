import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Role {

    @PrimaryGeneratedColumn({ name: 'role_id' })
    roleId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'title' })
    title: string;

    @ManyToMany(()=> User, (user) => user.roles)
    users: User[];
}