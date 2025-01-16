import {createAsyncThunk} from "@reduxjs/toolkit";
import $api from "../../http";
import {Album, Artist, ErrorResponse, Track} from "../../types.ts";
import {AxiosError} from "axios";


export const fetchArtists = createAsyncThunk<Artist[], void>('home/artists', async () => {
    try {
        const {data: response} = await $api.get('/artists');
        return response;
    } catch (e) {
        console.log(e)
    }
});

export const fetchSingleArtist = createAsyncThunk<Artist, string>('home/artist', async (id) => {
   try {
       const {data: response} = await $api.get('/artists/' + id)
       return response;
   } catch (e) {
       console.log(e);
   }
});

export const fetchAlbums = createAsyncThunk<
    Album[],
    string,
    { rejectValue: ErrorResponse }
>("home/albums", async (id: string, { rejectWithValue }) => {
    try {
        const { data } = await $api.get<Album[]>("/albums?artist=" + id);
        console.log(data);
        return data;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            return rejectWithValue({
                status: error.response.status,
                message: { error: error.response.data },
            });
        }
        return rejectWithValue({
            status: 500,
            message: { error: "Неизвестная ошибка" },
        });
    }
});

export const fetchTracks = createAsyncThunk<Track[], string>('home/tracksFetching', async (id) => {
    try {
        const {data: response} = await $api.get('/tracks?album=' + id)
        return response;
    } catch (e) {
        console.log(e)
    }
});
