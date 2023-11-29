/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Name } from '../Name';
import { ManyToMany, JoinTable, Column, JoinColumn } from 'typeorm';
import { OriginADT } from './OriginADT';
import { ParentADT } from './ParentADT';

@AuditingEntity(Name, { name: 'adt_name' })
export class NameADT extends Name implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    // @ManyToMany(() => OriginADT, (origin) => origin.names, { nullable: true })
    // @JoinColumn()
    // @JoinTable({
    //     name: 'name_suggest_origin',
    //     joinColumn: {
    //         name: 'fk_name_suggest_id',
    //         referencedColumnName: 'nameSuggestId',
    //     },
    //     inverseJoinColumn: {
    //         name: 'fk_origin_id',
    //         referencedColumnName: 'originId',
    //     },
    // })
    // origins: OriginADT[] | null;

    // @ManyToMany(() => ParentADT, (parent) => parent.names)
    // @JoinColumn()
    // parents: ParentADT[];

    // @ManyToMany(() => ParentADT, (parent) => parent.names)
    // @JoinColumn()
    // parentsDislike: ParentADT[];

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;

}