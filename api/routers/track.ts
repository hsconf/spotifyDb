import express from 'express';
import {TrackMutation} from "../types";
import Track from "../models/Track";
import Album from "../models/Album";

export const trackRouter = express.Router();

trackRouter.post('/', async (req, res, next) => {

    if (!req.body.album && !req.body.name) {
        res.status(400).send({"error": "name and album is required"});
    }

    const trackData: TrackMutation = {
       album: req.body.album,
       name: req.body.name,
       duration: req.body.duration,
   }

    const track = new Track(trackData);

    try {
        await track.save();
        res.status(200).send(track);

    } catch (e) {
        next(e);
        if (e instanceof Error) {
            res.status(400).send(e.message);
        } else {
            res.status(404).send({"error": "Not Found"});
        }
}});

trackRouter.get('/', async (req, res, next) => {
    const {album} = req.query;
    try {
        const filter = album ? {album} : {};
        const tracks = await Track.find(filter);
        if (tracks) {
            res.status(200).send(tracks);
        } else {
            res.status(404).send({"error": "Not Found"});
        }
    } catch (e) {
        next(e);
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});

trackRouter.get('/:id', async (req, res, next) => {
    try {
        const almums = await Album.find({"artist": `${req.params.id}`});
        // const tracks = await Track.findById(filter);
        if (almums.length === 0) {
            res.status(404).send({"error": "No Albums"});
        }

        const almumsId = almums.map(a => a._id);
        const tracks = await Track.find({"album": {$in: almumsId}})
        res.status(200).send({
            artist: req.params.id,
            tracks: tracks,
        });

    } catch (e) {
        next(e);
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
    }
});