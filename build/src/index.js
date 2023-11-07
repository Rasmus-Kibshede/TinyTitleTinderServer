"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
// Import the express in typescript file
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
// import routes
const userRoute_1 = __importDefault(require("./routes/userRoute"));
// Initialize the express engine
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Typeorm setup
const data_source_1 = require("./Repositories/data-source");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
data_source_1.appDataSource.initialize().then(() => {
    // eslint-disable-next-line no-console
    console.log('Database connection established');
    // Routes
    app.use(userRoute_1.default);
    app.use(authRoute_1.default);
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
