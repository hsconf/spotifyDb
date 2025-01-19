import {configureStore} from "@reduxjs/toolkit";
import {homeReducer} from "../src/containers/Home/homeSlice";
import {userReducer} from "../src/containers/Auth/userSlice.ts";

export const store = configureStore({
    reducer: {
        home: homeReducer,
        user: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;