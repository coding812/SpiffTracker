import { createSlice } from "@reduxjs/toolkit";

export const userStateSlice = createSlice({
    name: "userState",
    initialState: {
        user: null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
    });

export const { login, logout } = userStateSlice.actions;

export default userStateSlice.reducer;