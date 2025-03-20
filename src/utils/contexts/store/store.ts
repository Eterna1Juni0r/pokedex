import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './SessionSlice';

export const store = configureStore({
  reducer: {
    session: sessionReducer
  }
});

// Выводим тип корневого стейта (RootState) и dispatch (AppDispatch)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
