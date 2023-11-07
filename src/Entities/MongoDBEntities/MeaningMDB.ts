import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { NameMDB } from './NameMDB';

@Entity({ database: 'MongoDB_dbs' })
export class MeaningMDB {

    @ObjectIdColumn({ name: 'meaning_id' })
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'definition', unique: true })
    definition: string;

    @Column()
    names: NameMDB[];
}
