import {
    Column,
    Entity,
    ObjectId,
    ObjectIdColumn
  } from 'typeorm';
  import { OriginMDB } from './OriginMDB';
  import { ParentMDB } from './ParentMDB';
  import { MeaningMDB } from './MeaningMDB';
  
  @Entity({ name: 'name_suggest' })
  export class NameMDB {
    @ObjectIdColumn({ name: 'name_suggest_id' })
    nameSuggestId: ObjectId;
  
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

    @Column(() => OriginMDB)
    origins: OriginMDB[] | null;

    @Column(() => MeaningMDB)
    meanings: MeaningMDB[] | null;

    @Column(() => ParentMDB)
    parents: ParentMDB[];
  
    // @ManyToMany(() => OriginMDB, (origin) => origin.names, { nullable: true })
    // @JoinColumn()
    // @JoinTable({
    //   name: 'name_suggest_origin',
    //   joinColumn: {
    //     name: 'fk_name_suggest_id',
    //     referencedColumnName: 'nameSuggestId',
    //   },
    //   inverseJoinColumn: {
    //     name: 'fk_origin_id',
    //     referencedColumnName: 'originId',
    //   },
    // })
    // origins: OriginMDB[] | null;
  
    // @ManyToMany(() => MeaningMDB, (meaning) => meaning.names, { nullable: true })
    // @JoinColumn()
    // @JoinTable({
    //   name: 'name_suggest_meaning',
    //   joinColumn: {
    //     name: 'fk_name_suggest_id',
    //     referencedColumnName: 'nameSuggestId',
    //   },
    //   inverseJoinColumn: {
    //     name: 'fk_meaning_id',
    //     referencedColumnName: 'meaningId',
    //   },
    // })
    // meanings: MeaningMDB[] | null;
  
    // @ManyToMany(() => ParentMDB, (parent) => parent.names)
    // @JoinColumn()
    // parents: ParentMDB[];
  }
  