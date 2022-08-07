import { createSlice } from "@reduxjs/toolkit";
import leaderBoardApiService from "@/store/apiServices/leaderboard";
import { ScoreEntry } from "@/store/apiServices/leaderboard/types";

const initialState: {
  leaderList: Array<ScoreEntry>;
  cursorPosition: number;
  step: number;
  activeNext: boolean;
} = {
  leaderList: [],
  cursorPosition: 0,
  step: 10,
  activeNext: false,
};

const leaderBoardSlice = createSlice({
  name: "leaderBoard",
  initialState,
  reducers: {
    setNext(state) {
      state.cursorPosition += state.step;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        leaderBoardApiService.endpoints.getScoreEntries.matchFulfilled,
        (state, { payload }) => {
          const { length } = payload;
          state.activeNext = length >= state.step;
          state.leaderList.push(...payload.map((e) => e.data));
        }
      )
      .addMatcher(
        leaderBoardApiService.endpoints.postScoreEntry.matchFulfilled,
        (state) => {
          state.leaderList = [];
        }
      );
  },
});
export const { setNext } = leaderBoardSlice.actions;
export default leaderBoardSlice;
