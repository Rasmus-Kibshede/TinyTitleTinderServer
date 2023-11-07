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
}