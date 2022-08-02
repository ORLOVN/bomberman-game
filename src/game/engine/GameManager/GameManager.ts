import {
  addScore,
  addTime,
  reduceLeftLives,
  resetNumberOfLives,
  resetScore,
  resetTime,
  showGamePanel,
} from "@/store/slices";
import createStore from "@/store";
import { EScoreTypes } from "@/game/engine/GameManager/types";
import leaderBoardApiService from "@/store/apiServices/leaderboard";
import { TEAM_NAME } from "@/constants/common";

class GameManager {
  public isGameOver = false;
  public callbackOnTimeOver!: () => void;

  private levelsAmount = 1;
  private currentLevelNumber = 0;
  private store!: ReturnType<typeof createStore>;

  public showGamePanel(toggle: boolean): void {
    this.store.dispatch(showGamePanel(toggle));
  }

  public reduceLeftLives(): void {
    this.store.dispatch(reduceLeftLives());
    const gameStore = this.store.getState().game;
    if (gameStore.leftLives <= 0) {
      this.isGameOver = true;
    }
  }

  public resetLeftLives(): void {
    this.store.dispatch(resetNumberOfLives());
  }

  public addScore(type: EScoreTypes): void {
    this.store.dispatch(addScore(type));
  }
  public getScore(): number {
    return this.store.getState().game.score;
  }
  public resetScore(): void {
    this.store.dispatch(resetScore());
  }

  public addTime(leftTimeSecond?: number): void {
    const gameStore = this.store.getState().game;

    if (gameStore.leftTimeSecond <= 0 && !leftTimeSecond) {
      this.callbackOnTimeOver?.();
      return;
    }

    this.store.dispatch(addTime(leftTimeSecond));
  }

  public onTimeOver(callback: () => void): void {
    this.callbackOnTimeOver = callback;
  }

  public resetTime(): void {
    this.store.dispatch(resetTime());
  }
  public postScore(): void {
    const { user } = this.store.getState().auth;
    this.store.dispatch(
      leaderBoardApiService.endpoints.postScoreEntry.initiate({
        data: {
          score: this.getScore(),
          id: user.id,
          avatar: user.avatar,
          name: user.first_name,
        },
        ratingFieldName: "score",
        teamName: TEAM_NAME,
      })
    );
  }

  public reset(): void {
    this.isGameOver = false;
    this.resetLeftLives();
    this.resetScore();
    this.resetTime();
    this.store.dispatch(showGamePanel(false));
    this.setCurrentLevel(0);
  }

  public get maxLevels() {
    return this.levelsAmount;
  }

  public get currentLevel() {
    return this.currentLevelNumber;
  }

  public setCurrentLevel(lvl: number) {
    this.currentLevelNumber = lvl;
  }
  public bindStore(store: ReturnType<typeof createStore>) {
    this.store = store;
  }
}

export const gameManager = new GameManager();
