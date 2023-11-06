import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { ParentMDB } from './ParentMDB';

@Entity()
export class FamilyMDB {
  @ObjectIdColumn({ name: 'family_id' })
  familyId: ObjectId;

  @Column('varchar', { length: 255, nullable: false, name: 'family_name' })
  familyName: string;

  @Column()
  parents: ParentMDB[] | null;

//   @ManyToMany(() => ParentMDB, (parent) => parent.families, { nullable: true })
//   @JoinColumn()
//   @JoinTable({
//     name: 'family_parent',
//     joinColumn: {
//       name: 'fk_family_id',
//       referencedColumnName: 'familyId',
//     },
//     inverseJoinColumn: {
//       name: 'fk_parent_id',
//       referencedColumnName: 'parentId',
//     },
//   })
//   parents: ParentMDB[] | null;
}