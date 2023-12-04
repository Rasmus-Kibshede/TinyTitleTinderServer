/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { AuditingSubscriber } from 'typeorm-auditing';

export const mysqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.L_HOST,
  username: process.env.L_USERNAME,
  database: process.env.L_DATABASE,
  password: process.env.L_PASSWORD,
  port: Number(process.env.L_PORT),
  entities: ['src/Entities/*.ts', 'src/Entities/AuditEntities/*.ts'],
  subscribers: [AuditingSubscriber],
  synchronize: process.env.SYNCHRONIZE === 'true' || false,
  logging: false,
});

// TODO: Find solution to RangeError: Maximum call stack size exceeded when giving entity path.
export const mongoDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.M_DB_CONN_STRING,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  entities: ['src/Entities/MongoDBEntities/*.ts'],
  synchronize: true,
  logging: false,
});

export const getDb = async () => {
  switch (global.dbChoice) {
    case 'mysql':
     await dataSourceConnection(mysqlDataSource, 'mysql');
      break;
    case 'mongodb':
    await  dataSourceConnection(mongoDataSource, 'mysql');
      break;
    default:
    await  dataSourceConnection(mysqlDataSource, 'mysql');
      break;
  }
};

const dataSourceConnection = async (data: DataSource, dataType: string) => {
  await data
    .initialize()
    .then(() => {
      console.log(dataType, 'connected');
    })
    .catch((err) => {
      console.log(dataType, 'connected', err.message);
    });
};
