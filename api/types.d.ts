export interface ArtistMutation {
    name: string;
    description: string;
    image: string | null;
}

export interface TrackMutation {
    album: string;
    name: string;
    duration: string;
    youtube: string;
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

export interface TrackHistoryType {
    artist: string;
    name: string;
    datetime: string;
}