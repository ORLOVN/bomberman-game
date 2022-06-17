import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Roles } from "@/enums";
import { authApiService } from "../apiServices";
import { User } from "@/types";

const initialState = {
    role: Roles.guest,
    user: {} as User
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isAnyOf(
                    authApiService.endpoints.signIn.matchFulfilled,
                    authApiService.endpoints.getUserInfo.matchFulfilled,
                ),
                (state) => {
                    state.role = Roles.user
                }
            )
            .addMatcher(
                authApiService.endpoints.getUserInfo.matchFulfilled,
                (state, { payload }) => {
                    state.user = payload
                }
            )
            .addMatcher(
                authApiService.endpoints.signOut.matchFulfilled,
                (state) => {
                    state.role = Roles.guest
                }
            )
    },
});

export default authSlice;
