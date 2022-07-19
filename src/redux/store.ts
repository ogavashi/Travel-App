import { authAPI } from "./api/authAPI";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth/slice";

export const store = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
