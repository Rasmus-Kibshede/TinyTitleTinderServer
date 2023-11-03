import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Origin } from '../Origin';
import { ManyToMany, JoinColumn } from 'typeorm';
import { ADTName } from './NameADT';

@AuditingEntity(Origin, { name: 'adt_origin' })
export class ADTOrigin extends Origin implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => ADTName, (name) => name.origins, { nullable: true })
    @JoinColumn()
    names: ADTName[];

}