// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Name } from '../Name';
import { ManyToMany, JoinTable, Column } from 'typeorm';
import { OriginADT } from './OriginADT';
import { MeaningADT } from './MeaningADT';

@AuditingEntity(Name, { name: 'adt_name' })
export class NameADT extends Name implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => OriginADT, (origin) => origin.names, { nullable: true })
    @JoinTable({
        name: 'adt_name_suggest_origin',
        joinColumn: {
            name: 'fk_name_suggest_id',
            referencedColumnName: 'nameSuggestId',
        },
        inverseJoinColumn: {
            name: 'fk_origin_id',
            referencedColumnName: 'originId',
        },
    })
    origins: OriginADT[] | null;

    @ManyToMany(() => MeaningADT, (meaning) => meaning.names, { nullable: true })
    @JoinTable({
        name: 'adt_name_suggest_meaning',
        joinColumn: {
            name: 'fk_name_suggest_id',
            referencedColumnName: 'nameSuggestId',
        },
        inverseJoinColumn: {
            name: 'fk_meaning_id',
            referencedColumnName: 'meaningId',
        },
    })
    meanings: MeaningADT[] | null;

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;

}