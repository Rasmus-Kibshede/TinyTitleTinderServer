import { Column } from 'typeorm';

export class Family {

    @Column('varchar', { length: 255, name: 'family_name'})
    familyName: string;

    constructor(familyName: string) {
        this.familyName = familyName;
    }
}