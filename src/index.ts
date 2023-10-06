import 'dotenv/config';

// Import the express in typescript file
import express from 'express';
import 'reflect-metadata';
import router from './routes/userRoutes';

// Initialize the express engine
const app = express();
app.use(express.json());

//Typeorm setup
import { appDataSource } from './Repositories/data-source';
appDataSource.initialize().then(() => {
console.log('Database connection established');
	// Handling '/' Request
	app.get('/', (req, res) => {
		res.send('TypeScript With Express');
	});

	app.use(router);

	// Take a port 8080 for running server.
	const PORT = process.env.PORT || 3000;

	// Server setup
	app.listen(PORT, () => {
		console.log(`App: http://localhost:${PORT}/`);
	});

}).catch((error) => {
	console.log(error);
});