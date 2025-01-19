export interface Artist {
    _id: string;
    name: string;
    description: string;
    image: string;
}

export interface Album {
    _id: string;
    artist: string;
    name: string;
    releaseDate: string;
    image: string;
}

export interface ErrorResponse {
     status: number;
     message: {
         error: string;
     };
}

export interface Track {
    _id: string;
    name: string;
    album: string;
    duration: string;
    count: number;
    youtube: string | null;
}

export interface UserMutation {
    name: string;
    password: string;
}

export interface User extends UserMutation {
    _id: string;
    token: string;
}

export type UserResponse = Omit<User, 'password'>

export interface TrackHistory {
    _id: string;
    artist: string;
    name: string;
    datetime: string;
}