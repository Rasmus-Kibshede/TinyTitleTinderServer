import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { NameMDB } from './NameMDB';

@Entity()
export class MeaningMDB {

    @ObjectIdColumn( { name: 'meaning_id' })
    meaningId: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'definition', unique: true })
    definition: string;

    @Column()
    names: NameMDB[];

}