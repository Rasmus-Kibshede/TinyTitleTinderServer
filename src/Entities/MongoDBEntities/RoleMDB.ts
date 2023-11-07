import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity({ database: 'MongoDB_dbs' })
export class RoleMDB {

    @ObjectIdColumn({ name: 'role_id' })
    _id: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'title' })
    title: string;
}
