import { DataSource } from 'typeorm';
import { User } from '../Entities/User';
import { Role } from '../Entities/Role';

export const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    entities: [User, Role],
    synchronize: false,
    logging: false
});
