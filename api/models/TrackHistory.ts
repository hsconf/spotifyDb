import mongoose, {Schema} from "mongoose";
import User from "./User";
import Track from "./Track";

const trackHistorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Schema.Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User does not exist"
        }
    },
    track: {
        type: Schema.Types.ObjectId,
        ref: 'Track',
        required: [true, 'Track does not exist'],
        validate: {
            validator: async (value: Schema.Types.ObjectId) => {
                const track = await Track.findById(value);
                return !!track;
            },
            message: "Track not found!",
        }
    },
    datetime: {
        type: Date,
        default: Date.now,
    }
});

const TrackHistory = mongoose.model("TrackHistory", trackHistorySchema);

export default TrackHistory;