import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { NameMDB } from './NameMDB';

@Entity()
export class OriginMDB {

    @ObjectIdColumn({ name: 'origin_id' })
    originId: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'region' })
    region: string;

    @Column('varchar', { length: 255, nullable: false, name: 'religion' })
    religion: string;

    @Column('varchar', { length: 255, nullable: false, name: 'description' })
    description: string;

    @Column(() => NameMDB)
    names: NameMDB[];

    // @ManyToMany(() => NameMDB, (name) => name.origins)
    // @JoinColumn()
    // names: NameMDB[];
}