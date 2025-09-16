import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';

/**
 * Redux Toolkit store configuration
 * Centralized state management for the CRM application
 */
export const store = configureStore({
  reducer: {
    auth: authSlice,
    // Add more slices here as needed (leads, contacts, deals, etc.)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;