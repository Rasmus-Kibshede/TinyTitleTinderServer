import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Parent {
    @PrimaryGeneratedColumn({ name: 'parent_id' })
    parentId: number;

    @Column('int',{name: 'age' })
    age: number;
    
    @Column('varchar',{ length: 255, nullable: false, name: 'gender' })
    gender: string;

    @Column('varchar',{ length: 255, nullable: false, name: 'first_name' })
    firstName: string; 

    @Column('varchar',{ length: 255, nullable: false, name: 'last_name' })
    lastName: string; 

    @OneToOne(() => User)
    user: User;

    /*
    //TODO skal have Location på når den er klar.
    @OneToMany(() => Location, (location) => location.parents)
    location: Location;

    //TODO skal have invite på
    //@ManyToMany()
    //invite: Invite[];
*/
    
}

/*
	userId: number;
	locationId: number;
	inviteId: number;
	user: User;
*/