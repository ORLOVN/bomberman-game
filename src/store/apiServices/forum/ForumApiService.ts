import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetch from "isomorphic-fetch";
import { CreateTopicRequest } from "./types";
import { TopicPreview } from "@/types";

const forumApiService = createApi({
  reducerPath: "forumApiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `/my-api/v1/forum`,
    fetchFn: fetch,
  }),
  endpoints: (build) => ({
    createTopic: build.mutation<void, CreateTopicRequest>({
      query: (data) => ({
        url: "/create-topic",
        method: "POST",
        body: data,
        responseHandler: (response) => (
            response.ok
                ? response.text()
                : response.json()
        ),
      }),
    }),
    getTopics: build.query<TopicPreview[], void>({
      query: () => ({
        url: '/topics',
      }),
    }),
  }),
});

export default forumApiService;
