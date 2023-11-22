import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn, OneToOne } from 'typeorm';
//import { User } from './User';
import { Name } from './Name';
import { Family } from './Family';
import { Address } from './Address';

@Entity()
export class Parent {
  
  @PrimaryGeneratedColumn({ name: 'parent_id' })
  parentId: number;

  @Column('int', { name: 'age' })
  age: number;

  @Column('varchar', { length: 255, nullable: false, name: 'gender' })
  gender: string;

  @Column('varchar', { length: 255, nullable: false, name: 'first_name' })
  firstName: string;

  @Column('varchar', { length: 255, nullable: false, name: 'last_name' })
  lastName: string;

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

  @ManyToMany(() => Family, (family) => family.parents)
  families: Family[];

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;
}