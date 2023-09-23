import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
	host: process.env.HOST,
	user: process.env.USERNAME,
	database: process.env.DATABASE,
	password: process.env.PASSWORD,
	port: Number(process.env.DBPORT),
	waitForConnections: true,
	connectionLimit: 2,
	maxIdle: 2, // Max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // Idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
});

export default connection;
