import { createSlice } from "@reduxjs/toolkit";

const isValidUser = (user) => {
    return user && Object.keys(user).length > 0;
};

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
            state.user = isValidUser(action.payload.user) ? action.payload.user : null;
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