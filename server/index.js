import express from "express";
import mongoose from "mongoose";
import config from "config";
import fileUpload from "express-fileupload";
import {path} from "path";

import authRouter from "./routes/auth.routes.js";
import fileRouter from "./routes/file.routes.js";
import corsMiddleware from "./middleware/cors.middleware.js";
import filePathMiddleware from "./middleware/filepath.middleware.js";

const app = express();
const PORT = process.env.PORT || config.get('serverPort');
const DB_URL = config.get('dbUrl');


app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.json());
app.use(express.static('static'));
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const start = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log('SERVER START ON PORT ' + PORT));
    } catch(e) {
        console.log(e);
    }
};

start()

