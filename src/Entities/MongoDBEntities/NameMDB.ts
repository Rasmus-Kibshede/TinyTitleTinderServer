import {
  Column,
  Entity,
  ObjectId,
  ObjectIdColumn
} from 'typeorm';
import { OriginMDB } from './OriginMDB';
import { ParentMDB } from './ParentMDB';
import { MeaningMDB } from './MeaningMDB';

@Entity({name: 'name_suggest', database: 'MongoDB_dbs' })
export class NameMDB {

    @ObjectIdColumn({ name: 'name_suggest_id' })
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'name_suggest_name', unique: true, })
    nameSuggestName: string;

    @Column('varchar', { length: 255, nullable: false, name: 'gender' })
    gender: string;

    @Column('int', { nullable: true, name: 'popularity' })
    popularity: number | null;

    // TODO: future iteration would make nameDays and namesakes their own tables
    @Column('varchar', { length: 255, nullable: true, name: 'name_days' })
    nameDays: string;

    @Column('varchar', { length: 255, nullable: true, name: 'namesakes' })
    namesakes: string;

    @Column(() => OriginMDB)
    origins: OriginMDB[] | null;

    @Column(() => MeaningMDB)
    meanings: MeaningMDB[] | null;

    @Column(() => ParentMDB)
    parents: ParentMDB[];
}
