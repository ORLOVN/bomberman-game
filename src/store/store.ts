import { configureStore } from "@reduxjs/toolkit";
import { authApiService, profileApiService } from "./apiServices";
import { unauthenticatedMiddleware } from "./middlewares";
import { authSlice, gameSlice } from "./slices";


const createStore = (preloadedState: any = undefined) => configureStore({

    reducer: {
        [authSlice.name]: authSlice.reducer,
        [authApiService.reducerPath]: authApiService.reducer,
        [profileApiService.reducerPath]: profileApiService.reducer,
        [gameSlice.name]: gameSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        unauthenticatedMiddleware,
        authApiService.middleware,
        profileApiService.middleware
    ),
     preloadedState,
});

export default createStore;
