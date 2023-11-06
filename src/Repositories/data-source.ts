import { DataSource } from 'typeorm';
import { AuditingSubscriber } from 'typeorm-auditing';

export const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.L_HOST,
    username: process.env.L_USERNAME,
    database: process.env.L_DATABASE,
    password: process.env.L_PASSWORD,
    port: Number(process.env.L_PORT),
    entities: ['src/Entities/*.ts', 'src/Entities/AuditEntities/*.ts'],
    subscribers: [AuditingSubscriber],
    synchronize: true,
    logging: false
});

export const appDataSourceMongo = new DataSource({
    type: 'mongodb',
    host: process.env.M_HOST,
    port: Number(process.env.M_PORT),
    database: process.env.M_DATABASE,
    entities: ['src/Entities/MongoDBEntities/*.ts'],
    synchronize: true,
    logging: false
});