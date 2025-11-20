/**
 * Redux store configuration
 */

import { configureStore } from '@reduxjs/toolkit';
import blockReducer from './slices/blockSlice';

export const store = configureStore({
  reducer: {
    blocks: blockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['blocks/addBlock', 'blocks/updateBlock', 'blocks/loadProject'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.createdAt', 'payload.updatedAt'],
        // Ignore these paths in the state
        ignoredPaths: ['blocks.blocks', 'blocks.currentProject'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
