export interface ArtistMutation {
    name: string;
    description: string;
    image: string | null;
}

export interface TrackMutation {
    album: string;
    name: string;
    duration: string;
}

export interface AlbumMutation {
    artist: string;
    name: string;
    releaseDate: string;
    image: string | null;
}

export interface UserFields {
    name: string;
    password: string;
    token: string;
}