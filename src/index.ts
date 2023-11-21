import 'dotenv/config';

// Import the express in typescript file
import express from 'express';
import 'reflect-metadata';

// import routes
import userRouter from './routes/userRoute';
import addressRoute from './routes/addressRoute';
import roleRouter from './routes/roleRoute';
import parentRouter from './routes/parentRoute';
import nameRouter from './routes/nameRoute';
import authRouter from './routes/authRoute';
import originRouter from './routes/originRoute';
import locationRoute from './routes/locationRoute';
import familyRoute from './routes/familyRoute';
import meaningRoute from './routes/meaningRoute';
import cors from 'cors';
import cookiePaser from 'cookie-parser';

// Initialize the express engine
const app = express();
app.use(express.json());
app.use(cookiePaser());

//Typeorm setup
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
import { appDataSource, appDataSourceMongo } from './Repositories/data-source';
import userRouterMDB from './Routes/userRouteMDB';

appDataSourceMongo.initialize().then(() => {
	// eslint-disable-next-line no-console
	console.log('Mongo connection established');

	app.use(userRouterMDB);

	const PORT = process.env.M_PORT || 8080;

	app.listen(PORT, () => {
		// eslint-disable-next-line no-console
		console.log(`MongoDB App: http://localhost:${PORT}/`);

	});

}).catch((error) => {
	// eslint-disable-next-line no-console
	console.log(error);
});

appDataSource
  .initialize()
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connection established');

	// Routes
	app.use(cors());
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
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
