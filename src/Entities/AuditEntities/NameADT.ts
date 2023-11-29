// TODO: Update modifiedBy column to log user who made changes
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Name } from '../Name';
import { Column } from 'typeorm';

@AuditingEntity(Name, { name: 'adt_name' })
export class NameADT extends Name implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @Column('varchar', { length: 255, name: 'modified_by', nullable: true })
    modifiedBy: string;

}