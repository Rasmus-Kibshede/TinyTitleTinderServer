import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';

@Entity()
export class Location {
    @PrimaryGeneratedColumn({ name: 'location_id' })
    locationId: number;

    @Column('varchar',{ length: 255, nullable: false, name: 'country' })
    country: string;

    @OneToMany(() => Address, (address) => address.location)
    addresses: Address[];
}
