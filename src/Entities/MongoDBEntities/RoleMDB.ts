import { Column, Entity, ObjectId, ObjectIdColumn} from 'typeorm';

@Entity()
export class RoleMDB {

    @ObjectIdColumn({ name: 'role_id' })
    roleId: ObjectId;

    @Column('varchar', { length: 255, nullable: false, name: 'title' })
    title: string;

    
}