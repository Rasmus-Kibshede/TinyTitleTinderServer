import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import cookiePaser from 'cookie-parser';
import { getDb } from './Repositories/data-sources';

const app = express();
app.use(express.json());
app.use(cookiePaser());

declare global {
  // eslint-disable-next-line no-var
  var dbChoice: string;
}

app.use('*', async (req, res, next) => {
  if (req.headers['database-choice'] === undefined) {
    global.dbChoice = 'mysql';
  } else {
    global.dbChoice = req.headers['database-choice'] as string;
  }

  await getDb();
  next();
});

// Routes
import userRouter from './routes/userRoute';
import addressRoute from './routes/addressRoute';
import roleRouter from './routes/roleRoute';
import parentRouter from './routes/parentRoute';
import nameRouter from './routes/nameRoute';
import authRouter from './routes/authRoute';
import originRouter from './routes/originRoute';
import locationRoute from './routes/locationRoute';
import familyRoute from './routes/familyRoute';
import definitionRoute from './routes/definitionRoute';

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
app.use(definitionRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App: http://localhost:${PORT}/`);
});
