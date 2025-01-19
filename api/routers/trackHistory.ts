import express, {NextFunction} from 'express';
import User from '../models/User';
import TrackHistory from "../models/TrackHistory";
import {TrackHistoryType} from "../types";

const trackHistory = express.Router();

trackHistory.post('/', async (req: express.Request, res: express.Response, next: NextFunction) => {
    const token = req.get('Authorization');

    const user = await User.findOne({token}).select('_id')

    if (!user) {
        res.status(401).send({error: "User not found!"})
        return;
    }

    try {
        const history = new TrackHistory({
            user: user._id,
            track: req.body.track
        });

        await history.save();
        res.status(200).send(history);

    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
            next(e);
        }
    }
});

trackHistory.get('/', async (req: express.Request, res: express.Response, next: NextFunction) => {
    const token = req.get('Authorization');
    try {
        const userModel = await User.findOne({token});

        if (!userModel) {
            res.status(400).send({error: "User not found!"});
            return;
        }

        const tracksHistory = await TrackHistory.find({user: userModel._id})
            .populate<{ track: { name: string; album: { artist: { name: string } } } }>({
                path: 'track',
                select: 'name',
                populate: {
                    path: 'album',
                    populate: {
                        path: 'artist',
                        select: 'name'
                    }
                },
            })

        if (!tracksHistory) {

            res.status(400).send({error: "No tracks have been found!"});
            return;
        }

        const format: TrackHistoryType[] = tracksHistory.map((history) => ({
            _id: history._id,
            artist: history.track.album.artist.name,
            name: history.track.name,
            datetime: new Date(history.datetime).toISOString(),
        }));

        res.status(200).send(format.reverse());
    } catch (e) {
        res.status(500).send({error: "server error"});
        next()
    }
})

export default trackHistory;