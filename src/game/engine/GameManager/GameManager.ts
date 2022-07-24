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

const store = createStore();

class GameManager {
  public isGameOver = false;
  public callbackOnTimeOver!: () => void;

  public showGamePanel(toggle: boolean): void {
    store.dispatch(showGamePanel(toggle));
  }

  public reduceLeftLives(): void {
    const gameStore = store.getState().game;

    if (gameStore.leftLives === 0) {
      this.isGameOver = true;
      return;
    }

    store.dispatch(reduceLeftLives());
  }

  public resetLeftLives(): void {
    store.dispatch(resetNumberOfLives());
  }

  public addScore(type: EScoreTypes): void {
    store.dispatch(addScore(type));
  }

  public resetScore(): void {
    store.dispatch(resetScore());
  }

  public addTime(leftTimeSecond?: number): void {
    const gameStore = store.getState().game;

    if (gameStore.leftTimeSecond <= 0 && !leftTimeSecond) {
      this.callbackOnTimeOver?.();
      return;
    }

    store.dispatch(addTime(leftTimeSecond));
  }

  public onTimeOver(callback: () => void): void {
    this.callbackOnTimeOver = callback;
  }

  public resetTime(): void {
    store.dispatch(resetTime());
  }

  public unsubscribe(): void {
    this.isGameOver = false;
    this.resetLeftLives();
    this.resetScore();
    this.resetTime();
    store.dispatch(showGamePanel(false));
  }
}

export const gameManager = new GameManager();
