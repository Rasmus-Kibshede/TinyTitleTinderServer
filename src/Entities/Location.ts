import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Address } from './Address';

@Entity()
export class Location {
    @PrimaryGeneratedColumn({ name: 'location_id' })
    locationId: number;

    @Column('varchar',{ length: 255, nullable: false, name: 'country' })
    country: string;

    @OneToOne(() => Address)
    @JoinColumn()
    addressId: Address;
}

