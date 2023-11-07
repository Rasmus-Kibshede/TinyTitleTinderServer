import { Column } from 'typeorm';

export class RoleMDB {

    @Column()
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}
