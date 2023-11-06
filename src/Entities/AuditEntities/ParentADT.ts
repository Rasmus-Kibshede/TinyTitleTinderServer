import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Parent } from '../Parent';
import { OneToOne, JoinColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { UserADT } from './UserADT';
import { NameADT } from './NameADT';
import { FamilyADT } from './FamilyADT';
import { LocationADT } from './LocationADT';

@AuditingEntity(Parent, { name: 'adt_parent' })
export class ParentADT extends Parent implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @OneToOne(() => UserADT)
    @JoinColumn()
    user: UserADT;

    @ManyToMany(() => NameADT, (name) => name.parents, { nullable: true })
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
    names: NameADT[];

    @ManyToMany(() => FamilyADT, (family) => family.parents)
    families: FamilyADT[];

    @ManyToOne(() => LocationADT, (location) => location.parents)
    location: LocationADT;

}