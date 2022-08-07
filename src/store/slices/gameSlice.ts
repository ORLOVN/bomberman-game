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
      return {...state, leftLives: state.leftLives - 1};
    },
    resetNumberOfLives(state) {
      return {...state, leftLives:INITIAL_LEFT_LIVES};
    },
    addScore(state, { payload: scoreType }: PayloadAction<EScoreTypes>) {
      switch (scoreType) {
        case EScoreTypes.EBLOCK:
          return {...state, score: state.score + 100};
        case EScoreTypes.CREEP:
          return {...state, score: state.score + 500};
        default:
          return state;
      }
    },
    resetScore(state) {
      return {...state, score:INITIAL_SCORE};
    },
    addTime(state, { payload: leftTimeSecond }: PayloadAction<number | undefined>) {
      if (leftTimeSecond) {
        return {...state, leftTimeSecond}
      }
        return {...state, leftTimeSecond: state.leftTimeSecond-1};
    },
    resetTime(state) {
      return {...state, leftTimeSecond: INITIAL_lEFT_TIME_SECOND}
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
