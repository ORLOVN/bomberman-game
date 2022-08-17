import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetch from "isomorphic-fetch";
import { CreateCommentRequest, CreateTopicRequest } from "./types";
import { Topic } from "@/types";

const forumApiService = createApi({
  reducerPath: "forumApiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `/my-api/v1/forum`,
    fetchFn: fetch,
  }),
  tagTypes: ['Topic'],
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
      invalidatesTags: ['Topic']
    }),
    getTopics: build.query<Topic[], void>({
      query: () => ({
        url: '/topics',
      }),
      providesTags: (result) => result
        ? result.map(({ id }) => ({ type: 'Topic', id }))
        : ['Topic'],
    }),
    getTopic: build.query<Topic, string>({
      query: (id: string) => ({
        url: `/topics/${id}`,
      }),
      providesTags: (result) => [{type: 'Topic' as const, id: result?.id}]
    }),
    createComment: build.mutation<void, CreateCommentRequest>({
      query: (data) => ({
        url: "/create-comment",
        method: "POST",
        body: data,
        responseHandler: (response) => (
            response.ok
                ? response.text()
                : response.json()
        ),
      }),
      invalidatesTags: (_, __, arg) => [{ type: 'Topic', id: arg.topicId }],
    }),
  }),
});

export default forumApiService;
