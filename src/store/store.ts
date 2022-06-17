import { configureStore } from "@reduxjs/toolkit";
import { authApiService } from "./apiServices";
import { authSlice } from "./slices";


const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [authApiService.reducerPath]: authApiService.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApiService.middleware)
});

export default store;
