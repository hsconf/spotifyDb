import express from "express";
import {AlbumMutation} from "../types";
import Album from "../models/Album";
import {imageUpload} from "../multer";

export const albumRouter = express.Router();

albumRouter.post('/', imageUpload.single('image'), async (req, res, next) => {
    if (!req.body.artist && !req.body.name && !req.body.releaseDate) {
        res.status(400).send({"error": "artist, name, release date is required"});
    }

    const albumData: AlbumMutation = {
        artist: req.body.artist,
        name: req.body.name,
        image: req.file ? 'images' + req.file.filename : null,
        releaseDate: req.body.releaseDate
    }

    const album = new Album(albumData);

    try {
        await album.save();
        res.status(200).send(album);
    } catch (e) {
        next(e);
        if (e instanceof Error) {
            res.status(400).send(e.message);
        } else {
            res.status(400).send('An unknown error occurred.');
        }
    }
});

albumRouter.get('/', async (req, res, next) => {
    const artist = req.query.artist;
    console.log(artist);
    try {
        const filter = artist ? {artist: artist} : {};
        const albums = await Album.find(filter);
        console.log(albums);
        if (albums.length === 0) {
            res.status(404).send({"error": "No Albums"});
        } else {
            res.status(200).send(albums);
        }
    } catch (e) {
        if (e instanceof Error) {
            next(e);
            res.status(400).send(e.message);
        }
    }
});

albumRouter.get('/:id', async (req, res, next) => {
    try {
        const album = await Album.findById(req.params.id);
        res.status(200).send(album);
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
})