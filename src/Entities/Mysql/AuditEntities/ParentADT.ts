import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Parent } from '../Parent';
import { BeforeInsert } from 'typeorm';
import { mysqlDataSource } from '../../../Repositories/data-sources';

@AuditingEntity(Parent, { name: 'adt_parent' })
export class ParentADT extends Parent implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @BeforeInsert()
    dropFkAddressId() {
        if (process.env.SYNCHRONIZE !== 'true') {
            const queryRunner = mysqlDataSource.createQueryRunner();
            queryRunner.query('ALTER TABLE adt_parent DROP COLUMN fk_address_id;');
            queryRunner.query('ALTER TABLE adt_parent ADD COLUMN fk_address_id INT NULL;');
            queryRunner.release();
        }
    }
}