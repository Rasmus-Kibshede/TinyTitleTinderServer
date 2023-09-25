import 'dotenv/config';

// Import the express in typescript file
import express from 'express';

// Initialize the express engine
const app = express();
app.use(express.json());
// Handling '/' Request
app.get('/', (req, res) => {
	res.send('TypeScript With Express');
});
import userRouter from './routes/userRoutes';
app.use(userRouter);


// Take a port 8080 for running server.
const PORT = process.env.PORT || 3000;

// Server setup
app.listen(PORT, () => {
	console.log(`App: http://localhost:${PORT}/`);
});
