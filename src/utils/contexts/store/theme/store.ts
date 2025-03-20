import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './ThemeSlices';
import sessionReducer from '../SessionSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    session: sessionReducer
  }
});

// Типы для удобства
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
