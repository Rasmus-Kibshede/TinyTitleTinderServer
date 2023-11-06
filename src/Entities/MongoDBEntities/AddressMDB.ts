import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { LocationMDB } from './LocationMDB';

@Entity()
export class AddressMDB {
    @ObjectIdColumn({ name: 'address_id' })
    addressId: ObjectId;

    @Column('varchar',{ length: 255, nullable: false, name: 'city' })
    city: string;
    
    @Column('varchar',{ length: 255, nullable: false, name: 'zipcode' })
    zipcode: string;

    @Column('varchar',{ length: 255, nullable: false, name: 'address' })
    address: string; 

    @Column()
    location: LocationMDB;

    // @ManyToOne(() => LocationMDB, (location) => location.addresses)
    // location: LocationMDB;
}