import 'dotenv/config';

// Import the express in typescript file
import express from 'express';
import 'reflect-metadata';

// import routes
import userRouter from './Routes/userRoute';
import addressRoute from './Routes/addressRoute';
import roleRouter from './Routes/roleRoute';
import parentRouter from './Routes/parentRoute';
import nameRouter from './Routes/nameRoute';
import authRouter from './Routes/authRoute';
import originRouter from './Routes/originRoute';
import locationRoute from './Routes/locationRoute';
import familyRoute from './Routes/familyRoute';
import meaningRoute from './Routes/meaningRoute';

// Initialize the express engine
const app = express();
app.use(express.json());

//Typeorm setup
import { appDataSource } from './Repositories/data-source';
appDataSource.initialize().then(() => {
	// eslint-disable-next-line no-console
	console.log('Database connection established');

	// Routes
	app.use(userRouter);
	app.use(authRouter);
	app.use(nameRouter);
	app.use(addressRoute);
	app.use(roleRouter);
	app.use(parentRouter);
	app.use(originRouter);
	app.use(locationRoute);
	app.use(familyRoute);
	app.use(meaningRoute);


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