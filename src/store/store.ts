import { configureStore } from "@reduxjs/toolkit";
import { authApiService, profileApiService } from "./apiServices";
import { unauthenticatedMiddleware } from "./middlewares";
import { authSlice } from "./slices";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [authApiService.reducerPath]: authApiService.reducer,
        [profileApiService.reducerPath]: profileApiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        unauthenticatedMiddleware,
        authApiService.middleware,
        profileApiService.middleware
    )
});

export default store;
