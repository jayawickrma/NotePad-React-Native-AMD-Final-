// src/store/Store.ts
import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "@/app/Slices/UserSlice";


// Create Redux Store
export const store = configureStore({
    reducer: {
        user: UserSlice,
        post: PostSlice,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
