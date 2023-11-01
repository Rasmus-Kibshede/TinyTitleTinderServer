import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinColumn
} from 'typeorm';
import { Origin } from './Origin';
import { Parent } from './Parent';

@Entity({ name: 'name_suggest' })
export class Name {
  @PrimaryGeneratedColumn({ name: 'name_suggest_id' })
  nameSuggestId: number;

  @Column('varchar', { length: 255, nullable: false, name: 'name_suggest_name', unique: true, })
  nameSuggestName: string;

  @Column('varchar', { length: 255, nullable: false, name: 'gender' })
  gender: string;

  @Column('int', { nullable: true, name: 'popularity' })
  popularity: number | null;

  // TODO: future iteration would make nameDays and namesakes their own tables
  @Column('varchar', { length: 255, nullable: true, name: 'name_days' })
  nameDays: string;

  @Column('varchar', { length: 255, nullable: true, name: 'namesakes' })
  namesakes: string;

  @ManyToMany(() => Origin, (origin) => origin.names, { nullable: true })
  @JoinTable({
    name: 'name_suggest_origin',
    joinColumn: {
      name: 'fk_name_suggest_id',
      referencedColumnName: 'nameSuggestId',
    },
    inverseJoinColumn: {
      name: 'fk_origin_id',
      referencedColumnName: 'originId',
    },
  })
  origins: Origin[] | null;

  @ManyToMany(() => Parent, (parent) => parent.names)
  @JoinColumn()
    parents: Parent[];
}
