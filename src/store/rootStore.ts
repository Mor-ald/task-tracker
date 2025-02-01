import { configureStore } from '@reduxjs/toolkit';

import { tasksApi } from '@/services/api/tasksApi';

/**
 * Root Store
 */
export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(tasksApi.middleware),
});
