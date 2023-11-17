import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
} from 'typeorm';
import { OriginMDB } from './OriginMDB';
import { MeaningMDB } from './MeaningMDB';

@Entity({ name: 'name_suggest' })
export class NameSuggestMDB {
  
  @ObjectIdColumn()
  _id: ObjectId;
  
  @Column('varchar', { length: 255, nullable: false, name: 'name_suggest_name' })
  nameSuggestName: string;

  @Column('string', { length: 255, nullable: false, name: 'gender' })
  gender: string;

  @Column('int', { name: 'popularity' })
  popularity: number;

  @Column('varchar', { length: 255, nullable: true, name: 'name_days' })
  nameDays: string;

  @Column('varchar', { length: 255, nullable: true, name: 'namesakes' })
  namesakes: string;

  @Column(() => OriginMDB)
  origins: OriginMDB[];

  @Column(() => MeaningMDB)
  meanings: MeaningMDB[];
}
