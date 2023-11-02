// TODO: Find solution for auditing user entity
// import { AuditingAction, AuditingEntity, AuditingEntityDefaultColumns } from 'typeorm-auditing';
// import { User } from './User';

// @AuditingEntity(User, {name: 'adt_user'})
// export class ADTUser extends User implements AuditingEntityDefaultColumns{
//     readonly _seq!: number;
//     readonly _action!: AuditingAction;
//     readonly _modifiedAt!: Date;
    
// }