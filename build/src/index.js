"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// Import the express in typescript file
const express_1 = __importDefault(require("express"));
// Initialize the express engine
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Handling '/' Request
app.get('/', (req, res) => {
    res.send('TypeScript With Express');
});
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
app.use(userRoutes_1.default);
// Take a port 8080 for running server.
const PORT = process.env.PORT || 3000;
// Server setup
app.listen(PORT, () => {
    console.log(`App: http://localhost:${PORT}/`);
});
