import { Request } from "express";
import { configureStore } from "@reduxjs/toolkit";
import {
  authApiService,
  profileApiService,
  forumApiService,
  themeApiService,
  leaderBoardApiService,
} from "./apiServices";

import { unauthenticatedMiddleware } from "./middlewares";

import {
  authSlice,
  gameSlice,
  themeSlice,
  leaderBoardSlice,
  ssrModeSlice
} from "./slices";

const createStore = (
  preloadedState: any = undefined,
  ssrRequest: Request | undefined = undefined
) => configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [themeSlice.name]: themeSlice.reducer,
      [authApiService.reducerPath]: authApiService.reducer,
      [themeApiService.reducerPath]: themeApiService.reducer,
      [profileApiService.reducerPath]: profileApiService.reducer,
      [forumApiService.reducerPath]: forumApiService.reducer,
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
        themeApiService.middleware,
        profileApiService.middleware,
        leaderBoardApiService.middleware,
        forumApiService.middleware,
      ),
     preloadedState,
});

export default createStore;
