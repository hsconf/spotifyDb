import mongoose, {Schema} from 'mongoose';
import Album from "./Album";

const TrackSchema = new Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
        validate: {
            validator: async (value: Schema.Types.ObjectId) => {
                const album = await Album.findById(value);
                return !!album;
            },
            message: 'No album with this id',
        }
    },
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    duration: String,
    count: {
        type: Number,
        default: 1,
    }
});

TrackSchema.pre("save", async function (next) {
    const album = this.album;
    const tracks: number = await Track.countDocuments({album: album});
    console.log(tracks + 1);
    if (tracks) {
        this.count = tracks + 1;
    }
})

const Track = mongoose.model('Track', TrackSchema);
export default Track;