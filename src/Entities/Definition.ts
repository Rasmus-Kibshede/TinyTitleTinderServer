import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Definition {

    @PrimaryGeneratedColumn({ name: 'definition_id' })
    definitionId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'definition', unique: true })
    meaning: string;
}