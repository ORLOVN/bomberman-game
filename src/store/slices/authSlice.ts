import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Roles } from "@/enums";
import { authApiService, profileApiService } from "../apiServices";
import { User } from "@/types";
import { userActions } from "../actions";

const initialState = {
  role: Roles.guest,
  user: {} as User,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userActions.logout, (state) => {
        state.role = Roles.guest;
      })
      .addMatcher(
        authApiService.endpoints.getUserInfo.matchFulfilled,
        (state, { payload }) => {
          state.user = payload;
          state.role = Roles.user;
        }
      )
      .addMatcher(
        isAnyOf(
          profileApiService.endpoints.updateAvatar.matchFulfilled,
          profileApiService.endpoints.updateProfile.matchFulfilled
        ),
        (state, { payload }) => {
          state.user = payload;
        }
      )
      .addMatcher(authApiService.endpoints.signOut.matchFulfilled, (state) => {
        state.role = Roles.guest;
        state.user = {} as User;
      });
  },
});

export default authSlice;
