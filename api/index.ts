import express from "express";
import mongoose from "mongoose";
import {artistRouter} from "./routers/artist";
import {albumRouter} from "./routers/album";
import {trackRouter} from "./routers/track";
import userRouter from "./routers/user";
import trackHistory from "./routers/trackHistory";
import cors from "cors";
import config from "./config";

const app = express();
const port = 8000;
app.use(express.json());
app.use(express.static("public"));
app.use(cors())

app.use('/artists', artistRouter);
app.use('/albums', albumRouter);
app.use('/tracks', trackRouter);
app.use('/user', userRouter);
app.use('/track_history', trackHistory);

const run = async () => {
    await mongoose.connect(config.db);
    app.listen(port, () => {
        console.log('server is running on link http://localhost:' + port);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    })
};

void run();