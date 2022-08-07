import { configureStore } from "@reduxjs/toolkit";
import { authApiService, profileApiService } from "./apiServices";
import { unauthenticatedMiddleware } from "./middlewares";
import { authSlice, gameSlice, themeSlice } from "./slices";
import leaderBoardApiService from "@/store/apiServices/leaderboard";
import leaderBoardSlice from "@/store/slices/leaderBoardSlice";
import themeApiService from "@/store/apiServices/theme";

const createStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [themeSlice.name]: themeSlice.reducer,
      [authApiService.reducerPath]: authApiService.reducer,
      [themeApiService.reducerPath]: themeApiService.reducer,
      [profileApiService.reducerPath]: profileApiService.reducer,
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
        leaderBoardApiService.middleware
      ),
  });

export default createStore;
