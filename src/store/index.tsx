// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import tvShowsReducer from './tvShowsSlice';

export const store = configureStore({
  reducer: {
    tvShows: tvShowsReducer,
  },
});


// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;