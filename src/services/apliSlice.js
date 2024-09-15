import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseurl = import.meta.env.VITE_BASE_URL;

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseurl }),
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
    }),
  }),
});

export const { useGetTasksQuery } = api;
