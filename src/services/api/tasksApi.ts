import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Task, Tasks } from '@/types/Tasks';

/**
 * Tasks API
 */
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Tasks, string>({
      query: () => `tasks`,
    }),
    getTaskByStatus: builder.query<Tasks, string>({
      query: (status) => `tasks?status=${status}`,
    }),
    addTask: builder.mutation<Tasks, Task>({
      query: (task) => ({
        url: `tasks`,
        method: 'POST',
        body: task,
      }),
    }),
    updateTask: builder.mutation<Tasks, Task>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByStatusQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
} = tasksApi;
