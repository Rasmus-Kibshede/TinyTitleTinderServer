import mysql from 'mysql2/promise';
import { PoolOptions } from 'mysql2';

const access: PoolOptions = {
	host: process.env.L_HOST,
	user: process.env.L_USERNAME,
	database: process.env.L_DATABASE,
	password: process.env.L_PASSWORD,
	port: Number(process.env.L_PORT),
	waitForConnections: true,
	connectionLimit: 2,
	maxIdle: 2, // Max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // Idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
};

const conn = mysql.createPool(access);

export default conn;