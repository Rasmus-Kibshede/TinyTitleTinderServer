/* eslint-disable no-console */
import { DataSource } from 'typeorm';
import { AuditingSubscriber } from 'typeorm-auditing';

export const mysqlDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_MYSQL_HOST,
  username: process.env.DB_MYSQL_USERNAME,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_DATABASE,
  port: Number(process.env.DB_MYSQL_PORT),
  entities: [
    'src/Entities/Mysql/**/*.ts',
  ],
  subscribers: [AuditingSubscriber],
  synchronize: process.env.SYNCHRONIZE === 'true' || false,
  logging: false,
});

// TODO: Find solution to RangeError: Maximum call stack size exceeded when giving entity path.
export const mongoDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.DB_MONGO_URL,
  database: process.env.DB_MONGO_DATABASE,
  entities: ['src/Entities/Mongo/*.ts'],
  synchronize: process.env.SYNCHRONIZE === 'true' || false,
  logging: false,
});

// TODO: Check if the connection alrrady exists.
export const getDb = async () => {
  switch (global.dbChoice) {
    case 'mysql':
      await dataSourceConnection(mysqlDataSource, 'Mysql');
      break;
    case 'mongodb':
      await dataSourceConnection(mongoDataSource, 'MongoDB');
      break;
    default:
      await dataSourceConnection(mysqlDataSource, 'Mysql');
      break;
  }
};

const dataSourceConnection = async (data: DataSource, dataType: string) => {
  if (data.isInitialized) {
    return data;
  }
  await data
    .initialize()
    .then(() => {
      console.log(dataType, 'connected');
    })
    .catch((err) => {
      console.log(dataType, 'error', err.message);
    });
};
