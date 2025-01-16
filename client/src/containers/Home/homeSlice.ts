import {Album, Artist, ErrorResponse, Track} from "../../types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchAlbums, fetchArtists, fetchSingleArtist, fetchTracks} from "./homeThunk.ts";

export interface HomeStare {
    artists: Artist[];
    artist: Artist | null;
    albums: Album[];
    tracks: Track[];
    isLoading: boolean;
    isError: ErrorResponse | null;
}

const initialState: HomeStare = {
    artists: [],
    artist: null,
    albums: [],
    tracks: [],
    isLoading: false,
    isError: null,
}

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArtists.pending, state => {
                state.isLoading = true;
            })
            .addCase(fetchArtists.fulfilled, (state, {payload}: PayloadAction<Artist[]>) => {
                state.isLoading = false;
                state.artists = payload;
            })
            .addCase(fetchArtists.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleArtist.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSingleArtist.fulfilled, (state, {payload}: PayloadAction<Artist>) => {
                state.isLoading = true;
                console.log(payload);
                state.artist = payload || null;
            })
            .addCase(fetchSingleArtist.rejected, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAlbums.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAlbums.fulfilled, (state, {payload}: PayloadAction<Album[]>) => {
                state.isLoading = true;
                state.albums = payload;
            })
            .addCase(fetchAlbums.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.isError = payload || null;
                state.albums = [];
            })
            .addCase(fetchTracks.pending, (state, { payload }) => {
                state.isLoading = true;
                state.isError = payload || null;
                state.albums = [];
            })
            .addCase(fetchTracks.fulfilled, (state, { payload }: PayloadAction<Track[]>) => {
                state.isLoading = false;
                state.tracks = payload;
            })
            .addCase(fetchTracks.rejected, (state ) => {
                state.isLoading = false;
            })

    }
});

export const {} = homeSlice.actions;
export const homeReducer = homeSlice.reducer;