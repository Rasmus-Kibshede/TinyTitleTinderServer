import { Column } from 'typeorm';

export class OriginMDB {

    @Column('varchar', { length: 255, nullable: false, name: 'region' })
    region: string;

    @Column('varchar', { length: 255, nullable: false, name: 'religion' })
    religion: string;

    @Column('varchar', { length: 255, nullable: false, name: 'description' })
    description: string;

    constructor(region: string, religion: string, description: string) {
        this.region = region;
        this.religion = religion;
        this.description = description;
    }
}
