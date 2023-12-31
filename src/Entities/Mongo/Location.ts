import { Column } from 'typeorm';

export class Location {

    @Column('varchar', { length: 255, nullable: false, name: 'country' })
    country: string;

    constructor(country: string) {
        this.country = country;
    }
}