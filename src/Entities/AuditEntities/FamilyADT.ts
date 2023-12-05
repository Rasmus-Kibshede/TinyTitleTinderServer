import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Family } from '../MysqlEntities/Family';
import { ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import { ParentADT } from './ParentADT';

@AuditingEntity(Family, { name: 'adt_family' })
export class FamilyADT extends Family implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @ManyToMany(() => ParentADT, (parent) => parent.families, { nullable: true })
    @JoinColumn()
    @JoinTable({
        name: 'adt_family_parent',
        joinColumn: {
            name: 'fk_family_id',
            referencedColumnName: 'familyId',
        },
        inverseJoinColumn: {
            name: 'fk_parent_id',
            referencedColumnName: 'parentId',
        },
    })
    parents: ParentADT[];
}