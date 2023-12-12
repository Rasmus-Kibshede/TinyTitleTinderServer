import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { Origin } from '../Origin';
import { BeforeInsert } from 'typeorm';
import { mysqlDataSource } from '../../../Repositories/data-sources';

@AuditingEntity(Origin, { name: 'adt_origin' })
export class OriginADT extends Origin implements AuditingEntityDefaultColumns {
    readonly _seq!: number;
    readonly _action!: AuditingAction;
    readonly _modifiedAt!: Date;

    @BeforeInsert()
    dropFkOriginId() {
        if (process.env.SYNCHRONIZE === 'true') {
            const queryRunner = mysqlDataSource.createQueryRunner();
            queryRunner.query('ALTER TABLE adt_origin DROP COLUMN fk_definition_id;');
            queryRunner.query('ALTER TABLE adt_origin ADD COLUMN fk_definition_id INT NULL;');
            queryRunner.release();
        }
    }
}