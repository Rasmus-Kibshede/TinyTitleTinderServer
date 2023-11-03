import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Name } from '../Name';
import { ManyToMany, JoinTable, Column } from 'typeorm';
import { ADTOrigin } from './OriginADT';
import { ADTMeaning } from './MeaningADT';

@AuditingEntity(Name, { name: 'adt_name' })
export class ADTName extends Name implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => ADTOrigin, (origin) => origin.names, { nullable: true })
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
    origins: ADTOrigin[] | null;

    @ManyToMany(() => ADTMeaning, (meaning) => meaning.names, { nullable: true })
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
    meanings: ADTMeaning[] | null;

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;

}

// TODO: When roles have been properly implemented updated modifiedBy column to