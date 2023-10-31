import { Column, Entity, OneToOne, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { User } from './User';
import { Name } from './Name';

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
    @JoinColumn()
    user: User;

    @ManyToMany(() => Name, (name) => name.parents, { nullable: true })
    @JoinColumn()
  @JoinTable({
    name: 'parent_name_suggest',
    joinColumn: {
      name: 'fk_parent_id',
      referencedColumnName: 'parentId',
    },
    inverseJoinColumn: {
      name: 'fk_name_suggest_id',
      referencedColumnName: 'nameSuggestId',
    },
  })
  names: Name[] | null;

    /*
    //TODO skal have Location på når den er klar.
    @OneToMany(() => Location, (location) => location.parents)
    location: Location;

    //TODO skal have invite på
    //@ManyToMany()
    //invite: Invite[];
*/
}