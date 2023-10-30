import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn({ name: 'address_id' })
    addressId: number;

    @Column('varchar',{ length: 255, nullable: false, name: 'city' })
    city: string;
    
    @Column('varchar',{ length: 255, nullable: false, name: 'zipcode' })
    zipcode: string;

    @Column('varchar',{ length: 255, nullable: false, name: 'address' })
    address: string; 
}