import { DataSource } from 'typeorm';
import { User } from '../EntityManual/User';
import { Role } from '../EntityManual/Role';

export const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.L_HOST,
    username: process.env.L_USERNAME,
    database: process.env.L_DATABASE,
    password: process.env.L_PASSWORD,
    port: Number(process.env.L_PORT),
    entities: [User, Role],
    synchronize: false,
    logging: false
});
