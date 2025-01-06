import mongoose, {Schema} from 'mongoose';
import Artist from "./Artist";

const AlbumSchema = new Schema({
    artist: {
     type: Schema.Types.ObjectId,
     ref: 'Artist',
     required: true,
     validate: {
         validator: async (value: Schema.Types.ObjectId) => {
             const artist = await Artist.findById(value);
             return !!artist;
         },
         message: 'No Artist with this id',
     }
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    releaseDate: {
        type: String,
        required: [true, 'Release date is required'],
    },
    image: {
        type: String,
        default: null,
    },

});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;