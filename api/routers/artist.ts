import express from 'express';
import Artist from "../models/Artist";
import {imageUpload} from "../multer";

export const artistRouter = express.Router();

artistRouter.post('/', imageUpload.single('image'), async (req, res, next) => {

    const artistData = {
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
        const artist = await Artist.findById(req.params.id);
        if (artist) {
            res.status(200).send(artist);
        } else {
            res.status(404).send({"error": "Not Found"});
        }
    } catch (e) {
        next(e)
    }
})