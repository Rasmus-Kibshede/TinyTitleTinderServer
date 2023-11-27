import { DataSource } from 'typeorm';
import { AuditingSubscriber } from 'typeorm-auditing';

export const appDataSource = new DataSource({
<<<<<<< HEAD
  type: 'mysql',
  host: process.env.L_HOST,
  username: process.env.L_USERNAME,
  database: process.env.L_DATABASE,
  password: process.env.L_PASSWORD,
  port: Number(process.env.L_PORT),
  entities: ['src/Entities/**/*.ts'],
  subscribers: [AuditingSubscriber],
  synchronize: process.env.SYNCHRONIZE === 'true' || false,
  logging: false,
=======
    type: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    entities: ['src/Entities/**/*.js'],
    subscribers: [AuditingSubscriber],
    synchronize: false,
    logging: false
>>>>>>> 29bf62c82fc5f63f4d17533fa384d9b5f310ec89
});
