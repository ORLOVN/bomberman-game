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
  leaderBoardSlice
} from "./slices";

const createStore = () =>
  configureStore({
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
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        unauthenticatedMiddleware,
        authApiService.middleware,
        themeApiService.middleware,
        profileApiService.middleware,
        leaderBoardApiService.middleware,
        forumApiService.middleware,
      ),
  });

export default createStore;
