import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Parent } from './Parent';

@Entity()
export class Family {
  @PrimaryGeneratedColumn({ name: 'family_id' })
  familyId: number;

  @Column('varchar', { length: 255, nullable: false, name: 'family_name' })
  familyName: string;

  @ManyToMany(() => Parent, (parent) => parent.families, { nullable: true })
  @JoinColumn()
  @JoinTable({
    name: 'family_parent',
    joinColumn: {
      name: 'fk_family_id',
      referencedColumnName: 'familyId',
    },
    inverseJoinColumn: {
      name: 'fk_parent_id',
      referencedColumnName: 'parentId',
    },
  })
  parents: Parent[] | null;
}