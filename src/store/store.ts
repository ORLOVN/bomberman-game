import {Request} from "express";
import { configureStore } from "@reduxjs/toolkit";
import { authApiService, profileApiService } from "./apiServices";
import { unauthenticatedMiddleware } from "./middlewares";
import { authSlice, gameSlice } from "./slices";


const createStore = (preloadedState: any = undefined, ssrRequest: Request | undefined = undefined) => configureStore({

    reducer: {
        [authSlice.name]: authSlice.reducer,
        [authApiService.reducerPath]: authApiService.reducer,
        [profileApiService.reducerPath]: profileApiService.reducer,
        [gameSlice.name]: gameSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          request: ssrRequest,
        }
      }}
      ).concat(
        unauthenticatedMiddleware,
        authApiService.middleware,
        profileApiService.middleware
    ),
     preloadedState,
});

export default createStore;
