/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Origin } from '../Origin';
import { ManyToMany, JoinColumn, OneToOne } from 'typeorm';
import { NameADT } from './NameADT';
import { DefinitionADT } from './DefinitionADT';

@AuditingEntity(Origin, { name: 'adt_origin' })
export class OriginADT extends Origin implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    // @ManyToMany(() => NameADT, (name) => name.origins)
    // @JoinColumn()
    // names: NameADT[];

    // @OneToOne(() => DefinitionADT)
    // definition: DefinitionADT;

}