import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArtisSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,

    },
    description: String,
    image: String,
});

const Artist = mongoose.model('Artist', ArtisSchema);

export default Artist;