import { createSlice } from "@reduxjs/toolkit";

export const userStateSlice = createSlice({
    name: "userState",
    initialState: {
        user: null,
        token: null,
        jwtExpiration: null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.jwtExpiration = action.payload.jwtExpiration;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.jwtExpiration = null;
        },
    },
    });

export const { login, logout } = userStateSlice.actions;

export default userStateSlice.reducer;