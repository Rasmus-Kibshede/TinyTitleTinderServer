import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Meaning } from '../Meaning';
import { JoinColumn, ManyToMany } from 'typeorm';
import { ADTName } from './NameADT';

@AuditingEntity(Meaning, { name: 'adt_meaning' })
export class ADTMeaning extends Meaning implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => ADTName, (name) => name.meanings, { nullable: true })
    @JoinColumn()
    names: ADTName[];

}