import { configureStore } from "@reduxjs/toolkit";
import { authApiService, profileApiService } from "./apiServices";
import { authSlice } from "./slices";

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [authApiService.reducerPath]: authApiService.reducer,
        [profileApiService.reducerPath]: profileApiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApiService.middleware,
        profileApiService.middleware
    )
});

export default store;
