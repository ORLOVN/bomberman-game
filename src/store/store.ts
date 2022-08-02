import { configureStore } from "@reduxjs/toolkit";
import { authApiService, profileApiService } from "./apiServices";
import { unauthenticatedMiddleware } from "./middlewares";
import { authSlice, gameSlice } from "./slices";
import leaderBoardApiService from "@/store/apiServices/leaderboard";
import leaderBoardSlice from "@/store/slices/leaderBoardSlice";

const createStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [authApiService.reducerPath]: authApiService.reducer,
      [profileApiService.reducerPath]: profileApiService.reducer,
      [gameSlice.name]: gameSlice.reducer,
      [leaderBoardApiService.reducerPath]: leaderBoardApiService.reducer,
      [leaderBoardSlice.name]: leaderBoardSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        unauthenticatedMiddleware,
        authApiService.middleware,
        profileApiService.middleware,
        leaderBoardApiService.middleware
      ),
  });

export default createStore;
