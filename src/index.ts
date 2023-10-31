import 'dotenv/config';

// Import the express in typescript file
import express from 'express';
import 'reflect-metadata';

// import routes
import userRouter from './Routes/userRoute';
import addressRoute from './Routes/addressRoute';
import roleRouter from './Routes/roleRoute';
import parentRouter from './Routes/parentRoute'

// Initialize the express engine
const app = express();
app.use(express.json());

//Typeorm setup
import { appDataSource } from './Repositories/data-source';
import authRouter from './Routes/authRoute';
appDataSource.initialize().then(() => {
	// eslint-disable-next-line no-console
	console.log('Database connection established');

	// Routes
	app.use(userRouter);
	app.use(authRouter);
	app.use(addressRoute);
	app.use(roleRouter);
	app.use(parentRouter);

	// Take a port 8080 for running server.
	const PORT = process.env.PORT || 3000;

	// Server setup
	app.listen(PORT, () => {
		// eslint-disable-next-line no-console
		console.log(`App: http://localhost:${PORT}/`);
	});

}).catch((error) => {
	// eslint-disable-next-line no-console
	console.log(error);
});