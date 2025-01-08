import express, {NextFunction} from 'express';
import User from '../models/User';
import TrackHistory from "../models/TrackHistory";

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
})

export default trackHistory;