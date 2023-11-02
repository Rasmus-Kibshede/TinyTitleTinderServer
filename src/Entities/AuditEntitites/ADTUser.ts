import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
import { User } from '../User';

@AuditingEntity(User)
export class ADTUser extends User implements AuditingEntityDefaultColumns{
    readonly _seq: number;
    readonly _action: AuditingAction;
    readonly _modifiedAt: Date;

    
}