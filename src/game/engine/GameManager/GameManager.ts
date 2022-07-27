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

  private levelsAmount = 1;
  private currentLevelNumber = 0;

  public showGamePanel(toggle: boolean): void {
    store.dispatch(showGamePanel(toggle));
  }

  public reduceLeftLives(): void {
    store.dispatch(reduceLeftLives());
    const gameStore = store.getState().game;
    if (gameStore.leftLives <= 0) {
      this.isGameOver = true;
    }
  }

  public resetLeftLives(): void {
    store.dispatch(resetNumberOfLives());
  }

  public addScore(type: EScoreTypes): void {
    store.dispatch(addScore(type));
  }
  public getScore(): number {
    return store.getState().game.score;

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

  public reset(): void {
    this.isGameOver = false;
    this.resetLeftLives();
    this.resetScore();
    this.resetTime();
    store.dispatch(showGamePanel(false));
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
}

export const gameManager = new GameManager();
