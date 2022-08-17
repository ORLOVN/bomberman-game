import { Request } from "express";
import { configureStore } from "@reduxjs/toolkit";
import { authApiService, profileApiService } from "./apiServices";
import { unauthenticatedMiddleware } from "./middlewares";
import {authSlice, gameSlice, ssrModeSlice} from "./slices";
import leaderBoardApiService from "@/store/apiServices/leaderboard";
import leaderBoardSlice from "@/store/slices/leaderBoardSlice"

const createStore = (
  preloadedState: any = undefined,
  ssrRequest: Request | undefined = undefined
) => configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [authApiService.reducerPath]: authApiService.reducer,
      [profileApiService.reducerPath]: profileApiService.reducer,
      [gameSlice.name]: gameSlice.reducer,
      [leaderBoardApiService.reducerPath]: leaderBoardApiService.reducer,
      [leaderBoardSlice.name]: leaderBoardSlice.reducer,
      [ssrModeSlice.name]: ssrModeSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          request: ssrRequest,
        }
      }}).concat(
        unauthenticatedMiddleware,
        authApiService.middleware,
        profileApiService.middleware,
        leaderBoardApiService.middleware
      ),
     preloadedState,
});

export default createStore;
