import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetch from "isomorphic-fetch";
import {
  ScoreEntries,
  ScoreRequestData,
  ScoreEntryPostData,
} from "@/store/apiServices/leaderboard/types";
import { TEAM_NAME } from "@/constants/common";
import {prepareHeaders} from "@/utils/prepareHeaders";

const leaderBoardApiService = createApi({
  reducerPath: "leaderBoardApiService",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.HOST}${process.env.PROXY_API_PATH}/leaderboard`,
    credentials: "include",
    fetchFn: fetch,
    prepareHeaders
  }),
  tagTypes: ["LeaderBoard"],
  endpoints: (build) => ({
    postScoreEntry: build.mutation<void, ScoreEntryPostData>({
      query: (scoreEntry) => ({
        method: "POST",
        url: "/",
        body: scoreEntry,
        responseHandler: (response) =>
          response.ok ? response.text() : response.json(),
      }),
      invalidatesTags: ["LeaderBoard"],
    }),
    getScoreEntries: build.query<ScoreEntries, ScoreRequestData>({
      query: (scoreRequestData) => ({
        url: `/${TEAM_NAME}`,
        method: "POST",
        body: scoreRequestData,
      }),
      providesTags: ["LeaderBoard"],
    }),
  }),
});

export default leaderBoardApiService;
