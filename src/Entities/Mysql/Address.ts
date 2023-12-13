import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Location } from './Location';

@Entity()
export class Address {

    @PrimaryGeneratedColumn({ name: 'address_id' })
    addressId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'city' })
    city: string;

    @Column('varchar', { length: 255, nullable: false, name: 'zipcode' })
    zipcode: string;

    @Column('varchar', { length: 255, nullable: false, name: 'street' })
    street: string;

    @ManyToOne(() => Location, (location) => location.addresses)
    @JoinColumn({ name: 'fk_location_id', referencedColumnName: 'locationId' })
    location: Location;
}