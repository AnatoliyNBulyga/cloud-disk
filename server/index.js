import express from "express";
import mongoose from "mongoose";
import config from "config";

import authRouter from "./routes/auth.routes.js";

const app = express();
const PORT = config.get('serverPort');
const DB_URL = config.get('dbUrl');

app.use(express.json());
app.use('/api/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('SERVER START ON PORT ' + PORT));
    } catch(e) {
        console.log(e);
    }
};

start()

