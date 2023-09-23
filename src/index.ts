import "dotenv/config";

// Import the express in typescript file
import express from "express";

// Initialize the express engine
const app = express();

// Handling '/' Request
app.get("/", (_req, _res) => {
	_res.send("TypeScript With Expresssss");
});
import userRouter from "./routes/userRouter";
app.use(userRouter);

// Take a port 8080 for running server.
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-nullish-coalescing
const PORT = process.env.PORT || 3000;

// Server setup
app.listen(PORT, () => {
	console.log("The server is running on port", PORT);
	console.log(`App: http://localhost:${PORT}/`);
});
