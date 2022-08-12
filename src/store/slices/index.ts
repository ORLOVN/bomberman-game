export { default as authSlice } from "./authSlice";
export {
  default as gameSlice,
  showGamePanel,
  reduceLeftLives,
  resetNumberOfLives,
  addScore,
  resetScore,
  addTime,
  resetTime,
} from "./gameSlice";

export {
  default as leaderBoardSlice,
  setNext
} from "./leaderBoardSlice";

export {
  default as ssrModeSlice,
  setSSRMode, setClientMode
} from "./ssrModeSlice";
