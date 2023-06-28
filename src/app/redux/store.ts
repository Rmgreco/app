import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import { forecastApi, weatherApi } from "./services/weatherApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import storage from 'redux-persist/lib/storage';
import {
  persistReducer, persistStore,
} from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['weatherApi']
}

const persistedReducer = persistReducer(persistConfig, weatherReducer)

export const store = configureStore({
  reducer: {
    weatherReducer: persistedReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
    [forecastApi.reducerPath]: forecastApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
      .concat(weatherApi.middleware)
      .concat(forecastApi.middleware)


});

export const persistor = persistStore(store)
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
