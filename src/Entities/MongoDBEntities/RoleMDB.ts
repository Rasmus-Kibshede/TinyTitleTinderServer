import { ObjectId } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class RoleMDB {

    @ObjectIdColumn({ name: 'role_id' })
    _id: ObjectId;

    @Column('varchar', { nullable: false, default: 'user', unique: true })
    title: string = 'user';
}
