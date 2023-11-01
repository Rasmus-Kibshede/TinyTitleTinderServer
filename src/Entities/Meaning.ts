import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from './Name';

@Entity()
export class Meaning {

    @PrimaryGeneratedColumn( { name: 'meaning_id' })
    meaningId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'definition', unique: true, })
    definition: string;

    @ManyToMany(() => Name, (name) => name.meanings)
    names: Name[];
}