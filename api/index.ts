import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("public"));

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