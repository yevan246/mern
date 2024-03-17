import { configureStore } from "@reduxjs/toolkit";
import { todoApiSlice } from "./api/todoApiSlice";
import { authApiSlice } from "./api/authApi";
import { userApiSlice } from "./api/userApi";
import { userSlice } from "./features/userSlice";
import { postApiSlice } from "./api/postApi";

export const store = configureStore({
    reducer: {
        'user': userSlice.reducer,
        [todoApiSlice.reducerPath]: todoApiSlice.reducer,
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
        [postApiSlice.reducerPath]: postApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([todoApiSlice.middleware, authApiSlice.middleware, userApiSlice.middleware, postApiSlice.middleware])
})
