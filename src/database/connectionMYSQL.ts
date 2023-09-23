import mysql from 'mysql2/promise';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export default connection;

/*
const users = async () => {
  const [rows, fields] = await pool.query('select * from user')
console.log(rows)
};
users();
*/