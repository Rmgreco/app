import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import { weatherApi } from "./services/weatherApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";

export const store = configureStore({
  reducer: {
    weatherReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(weatherApi.middleware)


});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
