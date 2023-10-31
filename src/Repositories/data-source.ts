import { DataSource } from 'typeorm';
import { User } from '../Entities/User';
import { Role } from '../Entities/Role';
import { Address } from '../Entities/Address';
import { Location } from '../Entities/Location';

export const appDataSource = new DataSource({
    type: 'mysql',
    host: process.env.L_HOST,
    username: process.env.L_USERNAME,
    database: process.env.L_DATABASE,
    password: process.env.L_PASSWORD,
    port: Number(process.env.L_PORT),
    entities: [User, Role, Address, Location],
    synchronize: true,
    logging: false
});
