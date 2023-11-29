/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Parent } from '../Parent';
import { OneToOne, JoinColumn, ManyToMany, JoinTable, Column, BeforeInsert } from 'typeorm';
import { NameADT } from './NameADT';
import { FamilyADT } from './FamilyADT';
import { AddressADT } from './AddressADT';

@AuditingEntity(Parent, { name: 'adt_parent' })
export class ParentADT extends Parent implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    // @ManyToMany(() => NameADT, (name) => name.parents, { nullable: true })
    // @JoinColumn()
    // @JoinTable({
    //     name: 'parent_name_suggest',
    //     joinColumn: {
    //         name: 'fk_parent_id',
    //         referencedColumnName: 'parentId',
    //     },
    //     inverseJoinColumn: {
    //         name: 'fk_name_suggest_id',
    //         referencedColumnName: 'nameSuggestId',
    //     },
    // })
    // names: NameADT[] | null;

    // @ManyToMany(() => NameADT, (name) => name.parents, { nullable: true })
    // @JoinColumn()
    // @JoinTable({
    //     name: 'parent_name_suggest_dislike',
    //     joinColumn: {
    //         name: 'fk_parent_id',
    //         referencedColumnName: 'parentId',
    //     },
    //     inverseJoinColumn: {
    //         name: 'fk_name_suggest_id',
    //         referencedColumnName: 'nameSuggestId',
    //     },
    // })
    // namesDisliked: NameADT[] | null;

    // @ManyToMany(() => FamilyADT, (family) => family.parents)
    // families: FamilyADT[];

    // @OneToOne(() => AddressADT)
    // @JoinColumn({ name: 'fk_address_id' })
    // address: AddressADT;

}