import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Parent } from '../Parent';
import { OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { ADTUser } from './UserADT';
import { ADTName } from './NameADT';
import { ADTFamily } from './FamilyADT';
import { ADTLocation } from './LocationADT';

@AuditingEntity(Parent, { name: 'adt_parent' })
export class ADTParent extends Parent implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @OneToOne(() => ADTUser)
    @JoinColumn()
    user: ADTUser;

    @ManyToMany(() => ADTName, (name) => name.parents, { nullable: true })
    @JoinColumn()
    @JoinTable({
        name: 'adt_parent_name_suggest',
        joinColumn: {
            name: 'fk_parent_id',
            referencedColumnName: 'parentId',
        },
        inverseJoinColumn: {
            name: 'fk_name_suggest_id',
            referencedColumnName: 'nameSuggestId',
        },
    })
    names: ADTName[];

    @ManyToMany(() => ADTFamily, (family) => family.parents)
    families: ADTFamily[];

    @ManyToOne(() => ADTLocation, (location) => location.parents)
    location: ADTLocation;

}