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