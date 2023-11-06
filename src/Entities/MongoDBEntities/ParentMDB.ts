import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { UserMDB } from './UserMDB';
import { NameMDB } from './NameMDB';
import { FamilyMDB } from './FamilyMDB';
import { LocationMDB } from './LocationMDB';

@Entity()
export class ParentMDB {

  @ObjectIdColumn({ name: 'parent_id' })
  parentId: ObjectId;

  @Column('int', { name: 'age' })
  age: number;

  @Column('varchar', { length: 255, nullable: false, name: 'gender' })
  gender: string;

  @Column('varchar', { length: 255, nullable: false, name: 'first_name' })
  firstName: string;

  @Column('varchar', { length: 255, nullable: false, name: 'last_name' })
  lastName: string;

  @Column(() => UserMDB)
  user: UserMDB;

  @Column(() => NameMDB)
  names: NameMDB[] | null;

  @Column(() => FamilyMDB)
  families: FamilyMDB[];

  @Column(() => LocationMDB)
  location: LocationMDB;

//   @OneToOne(() => UserMDB)
//   @JoinColumn()
//   user: UserMDB;

//   @ManyToMany(() => NameMDB, (name) => name.parents, { nullable: true })
//   @JoinColumn()
//   @JoinTable({
//     name: 'parent_name_suggest',
//     joinColumn: {
//       name: 'fk_parent_id',
//       referencedColumnName: 'parentId',
//     },
//     inverseJoinColumn: {
//       name: 'fk_name_suggest_id',
//       referencedColumnName: 'nameSuggestId',
//     },
//   })
//   names: NameMDB[] | null;

//   @ManyToMany(() => FamilyMDB, (family) => family.parents)
//   families: FamilyMDB[];

//   @ManyToOne(() => LocationMDB, (location) => location.parents)
//   location: LocationMDB;

}