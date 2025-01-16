import express from 'express';
import Artist from "../models/Artist";
import {imageUpload} from "../multer";
import {ArtistMutation} from "../types";
import mongoose, {Types} from "mongoose";

export const artistRouter = express.Router();

artistRouter.post('/', imageUpload.single('image'), async (req, res, next) => {

    const artistData: ArtistMutation = {
        name: req.body.name,
        description: req.body.description,
        image: req.file ? 'images' + req.file.filename : null,
    }
    const artist = new Artist(artistData);

    try {
        await artist.save();
        res.status(200).send(artist);
    } catch (e) {
        next(e)
    }
});

artistRouter.get('/', async (req, res, next) => {
    try {
        const artists = await Artist.find();
        if (artists) {
            res.status(200).send(artists);
        } else {
            res.status(404).send({"error": "Not Found"});
        }
    } catch (e) {
        next(e)
        res.status(400).send(e)
    }
});

artistRouter.get('/:id', async (req, res, next) => {
    try {

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(400).json({ error: "Invalid ID format" });
            return;
        }

        const artist = await Artist.findById(req.params.id);

        res.status(200).send(artist);
    } catch (e) {
        next(e)
    }
})