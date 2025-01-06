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
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;