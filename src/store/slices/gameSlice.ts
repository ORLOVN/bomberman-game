import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EScoreTypes } from "@/game/engine/GameManager/types";

const INITIAL_LEFT_LIVES = 2;
const INITIAL_lEFT_TIME_SECOND = 0;
const INITIAL_SCORE = 0;

const initialState = {
  showPanel: false,
  leftLives: INITIAL_LEFT_LIVES,
  leftTimeSecond: INITIAL_lEFT_TIME_SECOND,
  score: INITIAL_SCORE,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    showGamePanel(state, { payload: showPanelFlag }: PayloadAction<boolean>) {
      state.showPanel = showPanelFlag;
    },
    reduceLeftLives(state) {
      state.leftLives -= 1;
    },
    resetNumberOfLives(state) {
      state.leftLives = INITIAL_LEFT_LIVES;
    },
    addScore(state, { payload: scoreType }: PayloadAction<EScoreTypes>) {
      if (scoreType === EScoreTypes.EBLOCK) {
        state.score += 100;
      } else if (scoreType === EScoreTypes.CREEP) {
        state.score += 500;
      }
    },
    resetScore(state) {
      state.score = INITIAL_SCORE;
    },
    addTime(state, { payload: leftTimeSecond }: PayloadAction<number | undefined>) {
      if (leftTimeSecond) {
        state.leftTimeSecond = leftTimeSecond;
      } else {
        state.leftTimeSecond -= 1;
      }
    },
    resetTime(state) {
      state.leftTimeSecond = INITIAL_lEFT_TIME_SECOND;
    },
  },
});

export const {
  showGamePanel,
  reduceLeftLives,
  resetNumberOfLives,
  addScore,
  resetScore,
  addTime,
  resetTime,
} = gameSlice.actions;

export default gameSlice;
