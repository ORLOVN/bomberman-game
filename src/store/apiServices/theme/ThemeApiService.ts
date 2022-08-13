import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetch from "isomorphic-fetch";
import Theme from '@/enums/Theme';

const themeApiService = createApi({
  reducerPath: "themeApiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `/my-api/v1`,
    fetchFn: fetch,
  }),
  tagTypes: ["Theme"],
  endpoints: (build) => ({
    getUserTheme: build.query<{ yaId: number; theme: Theme }, number>({
      query: (yaId) => ({
        url: `/theme/${yaId}`,
      }),
      providesTags: ["Theme"],
    }),
    switchTheme: build.mutation<{theme: Theme}, number>({
      query: (yaId) => ({
        url: "/theme",
        method: "PUT",
        body: { yaId },
        invalidatesTags: (result: unknown) => (result ? ["Theme"] : []),
      }),
    }),
  }),
});

export default themeApiService;
