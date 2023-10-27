import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Name {

    @PrimaryGeneratedColumn({ name: 'name_suggest_id' })
    nameSuggestId: number;

    @Column('varchar', { length: 255, nullable: false, name: 'name_suggest_name', unique: true })
    nameSuggestName: string;

    @Column('varchar', { length: 255, nullable: false, name: 'gender' })
    gender: string;

    @Column('int', { nullable: true, name: 'popularity' })
    popularity: number | null;

    @Column('datetime', { nullable: true, name: 'name_days' })
    nameDays: Date | null;

    @Column('varchar', { length: 255, nullable: true, name: 'namesakes' })
    namesakes: string | null;

}