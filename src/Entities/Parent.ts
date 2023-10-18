import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Parent {

    @PrimaryGeneratedColumn({ name: 'parent_id' })
    parentId: number;

    @Column()
    age: number;

    @Column('varchar', { length: 255, nullable: false, name: 'gender' })
    gender: string;

    @Column('varchar', { length: 255, nullable: false, name: 'first_name' })
    firstName: string;

    @Column('varchar', { length: 255, nullable: false, name: 'last_name' })
    lastName: string;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}