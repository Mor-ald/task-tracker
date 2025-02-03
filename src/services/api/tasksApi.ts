import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Task, Tasks } from '@/types/Tasks';

/**
 * Tasks API
 */
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  endpoints: (builder) => ({
    getTasks: builder.query<Tasks, void>({
      query: () => `tasks`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    getTaskByStatus: builder.query<Tasks, string>({
      query: (status) => `tasks?status=${status}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    addTask: builder.mutation<Tasks, Omit<Task, 'id'>>({
      query: (task) => ({
        url: `tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTask: builder.mutation<Tasks, Task>({
      query: ({ id, ...body }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        body: body,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateStatusTask: builder.mutation<Tasks, Pick<Task, 'id' | 'status'>>({
      query: ({ id, ...patch }) => ({
        url: `tasks/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByStatusQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useUpdateStatusTaskMutation,
} = tasksApi;
