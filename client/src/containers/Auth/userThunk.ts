import {createAsyncThunk} from "@reduxjs/toolkit";
import {ErrorResponse, TrackHistory, User, UserMutation, UserResponse} from "../../types.ts";
import $api from "../../http";
import {isAxiosError} from "axios";

export const signup = createAsyncThunk<User, UserMutation, {rejectValue: ErrorResponse}>('user/signup', async (user, {rejectWithValue}) => {
    try {
        const response = await $api.post('/user', user);
            if (response) {
                localStorage.setItem('token', response.data.token)
            }
        return response.data
    } catch (e) {

        if (isAxiosError(e) && e.response) {
            return rejectWithValue({status: e.response.status, message: e.response.data});
        }

        return rejectWithValue({status: 500, message: {error: "unknown error"}});
    }
});

export const login = createAsyncThunk<UserResponse, UserMutation, {rejectValue: ErrorResponse}>('user/login', async (user, {rejectWithValue}) => {
    try {
        const response = await $api.post('user/sessions', user);
        if (response) {
            localStorage.setItem('token', response.data.token)
        }
        return response.data
    } catch (e) {
        console.log(e)
        if (isAxiosError(e) && e.response) {
            return rejectWithValue({status: e.response.status, message: e.response.data});
        }

        return rejectWithValue({status: 500, message: {error: "unknown error"}});
    }
});

export const addSondToHistory = createAsyncThunk<void, string>('user/listeningSong', async (track) => {
    await $api.post('/track_history', {track}, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
    });
});

export const getTrackHistory = createAsyncThunk<TrackHistory[], void>('user/fetching-history', async () => {
    try {
        const response = await $api.get('/track_history', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });

        return response.data;
    } catch (e) {
        console.log(e)
    }
});