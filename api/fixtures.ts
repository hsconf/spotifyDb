import mongoose from "mongoose";
import config from "./config";
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection('albums');
        await db.dropCollection('artists');
        await db.dropCollection('tracks');
        await db.dropCollection('trackhistories');
        await db.dropCollection('users');
    } catch (e) {
        console.log("Error dropping collection", e);
    }

    const artistsFix = [
        {
            name: "Trevor",
            description: "Trevor description",
            image: "/images/trevor.png",
        },
        {
            name: "Michael",
            description: "Michael description",
            image: "/images/michael.png",
        },
        {
            name: "Franklin",
            description: "Franklin description",
            image: "/images/franklin.png",
        },
    ];

    await Artist.insertMany(artistsFix);

    const artists = await Artist.find();

    if (artists.length === 0) {
        console.error('No artists found. Please seed artists first.');
        process.exit(1);
    }

    const albums = [
        {
            artist: artists[0]._id,
            name: "Trevor's Hits",
            releaseDate: 2023,
            image: "https://example.com/album1.png",
        },
        {
            artist: artists[1]._id,
            name: "Michael's Classics",
            releaseDate: 2021,
            image: "https://example.com/album2.png",
        },
        {
            artist: artists[2]._id,
            name: "Franklin's Beats",
            releaseDate: 2020,
            image: "https://example.com/album3.png",
        },
    ];

    await Album.insertMany(albums);

    const albumsFix = await Album.find();

    if (albumsFix.length === 0) {
        console.error('No albums found. Please seed albums first.');
        process.exit(1);
    }

    const tracks = [
        {
            album: albumsFix[0]._id,
            name: "Trevor's Anthem",
            duration: "3:45",
        },
        {
            album: albumsFix[0]._id,
            name: "Trevor's Journey",
            duration: "4:10",
        },
        {
            album: albumsFix[1]._id,
            name: "Michael's Symphony",
            duration: "5:20",
        },
        {
            album: albumsFix[1]._id,
            name: "Michael's Ballad",
            duration: "2:50",
        },
        {
            album: albumsFix[2]._id,
            name: "Franklin's Groove",
            duration: "3:30",
        },
    ];

    await Track.insertMany(tracks);
    console.log("Database seeded successfully");
}

run().catch(err => console.log(err));
