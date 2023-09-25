import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USERNAME,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_DBPORT),
	waitForConnections: true,
	connectionLimit: 2,
	maxIdle: 2, // Max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // Idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
};

const conn = mysql.createPool(access);

log('Connection to MySQL established');

export default conn;
