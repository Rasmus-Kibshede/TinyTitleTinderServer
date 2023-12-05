import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Origin } from '../MysqlEntities/Origin';
import { ManyToMany, JoinColumn } from 'typeorm';
import { NameADT } from './NameADT';

@AuditingEntity(Origin, { name: 'adt_origin' })
export class OriginADT extends Origin implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => NameADT, (name) => name.origins, { nullable: true })
    @JoinColumn()
    names: NameADT[];

}