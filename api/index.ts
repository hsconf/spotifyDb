import express from "express";
import mongoose from "mongoose";
import {artistRouter} from "./routers/artist";
import {albumRouter} from "./routers/album";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("public"));

app.use('/spotify', artistRouter)
app.use('/album', albumRouter)

const run = async () => {
    await mongoose.connect('mongodb://localhost/spotify');
    app.listen(port, () => {
        console.log('server is running on link http://localhost:' + port);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    })
};

void run();