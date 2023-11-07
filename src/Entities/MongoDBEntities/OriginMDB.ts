import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { NameMDB } from './NameMDB';

@Entity({ database: 'test' })
export class OriginMDB {

    @ObjectIdColumn({ name: 'origin_id' })
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'region' })
    region: string;

    @Column('varchar', { length: 255, nullable: false, name: 'religion' })
    religion: string;

    @Column('varchar', { length: 255, nullable: false, name: 'description' })
    description: string;

    @Column(() => NameMDB)
    names: NameMDB[];
}
