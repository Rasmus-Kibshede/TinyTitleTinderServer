import { DataSource } from 'typeorm';
import { User } from '../entity/User';
import { Role } from '../entity/Role';

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
