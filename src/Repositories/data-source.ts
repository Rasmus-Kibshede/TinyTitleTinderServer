import { DataSource } from 'typeorm';
import { AuditingSubscriber } from 'typeorm-auditing';
import { AddressMDB } from '../Entities/MongoDBEntities/AddressMDB';
import { FamilyMDB } from '../Entities/MongoDBEntities/FamilyMDB';
import { LocationMDB } from '../Entities/MongoDBEntities/LocationMDB';
import { MeaningMDB } from '../Entities/MongoDBEntities/MeaningMDB';

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

// TODO: Find solution to RangeError: Maximum call stack size exceeded when giving entity path.
export const appDataSourceMongo = new DataSource({
    type: 'mongodb',
    url: process.env.M_DB_CONN_STRING,
    useNewUrlParser: true,
    synchronize: true,
    useUnifiedTopology: true,
    ssl: true,
    entities: [AddressMDB, FamilyMDB, LocationMDB, MeaningMDB],
    logging: false
});