"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
/* eslint-disable no-console */
// Import the express in typescript file
const express_1 = __importDefault(require("express"));
// Initialize the express engine
const app = (0, express_1.default)();
// Handling '/' Request
app.get('/', (_req, _res) => {
    _res.send('TypeScript With Expresssss');
});
// Take a port 8080 for running server.
// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/prefer-nullish-coalescing
const PORT = process.env.PORT || 3000;
// Server setup
app.listen(PORT, () => {
    console.log('The server is running on port', PORT);
    console.log(`App: http://localhost:${PORT}/`);
});
