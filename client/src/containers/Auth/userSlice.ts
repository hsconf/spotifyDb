import {ErrorResponse, TrackHistory, User, UserResponse} from "../../types.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getTrackHistory, login, signup} from "./userThunk.ts";

export interface UserState {
    user: User | UserResponse | null;
    isLoading: boolean;
    signInError: ErrorResponse | null;
    loginError: ErrorResponse | null;
    tracksHistory: TrackHistory[];
}

const initialState: UserState = {
    user: null,
    isLoading: false,
    signInError: null,
    loginError: null,
    tracksHistory: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signup.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(signup.fulfilled, (state, {payload}: PayloadAction<User>) => {
                state.isLoading = false;
                state.user = payload
            })
            .addCase(signup.rejected, (state, {payload}: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.signInError = payload || null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, {payload}: PayloadAction<UserResponse>) => {
                state.isLoading = false;
                state.user = payload
            })
            .addCase(login.rejected, (state, {payload}: PayloadAction<ErrorResponse | undefined>) => {
                state.isLoading = false;
                state.loginError = payload || null
            })
            .addCase(getTrackHistory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTrackHistory.fulfilled, (state, {payload}: PayloadAction<TrackHistory[]>) => {
                state.isLoading = false;
                state.tracksHistory = payload
            })
            .addCase(getTrackHistory.rejected, (state) => {
                state.isLoading = false;
            })
    }
});

export const userReducer = userSlice.reducer