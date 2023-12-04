import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Definition {

    @PrimaryGeneratedColumn({ name: 'definition_id' })
    definitionId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'meaning', unique: true })
    meaning: string;
}