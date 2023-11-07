import { DataSource } from 'typeorm';
import { AuditingSubscriber } from 'typeorm-auditing';
import { UserMDB } from '../Entities/MongoDBEntities/UserMDB';
import { RoleMDB } from '../Entities/MongoDBEntities/RoleMDB';
import { ParentMDB } from '../Entities/MongoDBEntities/ParentMDB';

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
    entities: [UserMDB, RoleMDB, ParentMDB],
    logging: false
});