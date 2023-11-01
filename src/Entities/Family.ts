import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { Parent } from './Parent';

@Entity()
export class Family {
    @PrimaryGeneratedColumn({ name: 'family_id' })
    familyId: number;
    
    @Column('varchar',{ length: 255, nullable: false, name: 'family_name' })
    familyName: string;

    @ManyToMany(() => Parent, (parent) => parent.famalies, { nullable: true })
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

    /*
    //TODO skal have Location på når den er klar.
    @OneToMany(() => Location, (location) => location.parents)
    location: Location;

    //TODO skal have invite på
    //@ManyToMany()
    //invite: Invite[];
*/
}