import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import sideBarReducer from '@/components/ui/sidebar/SideBarSlice';
import taskFormReducer from '@/components/ui/task-form/TaskFormSlice';
import { tasksApi } from '@/services/api/tasksApi';

/**
 * Root Store
 */
export const store = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    formTask: taskFormReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

// Setup listeners
setupListeners(store.dispatch);
