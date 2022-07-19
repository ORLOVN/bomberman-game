export class Timer {
  private currentTimeMS = 0;
  private timeOutMS: number;
  private callBack: () => void;
  private isStopped = true;

  constructor(callBack: () => void, timeOutMS = 0) {
    this.callBack = callBack;
    this.timeOutMS = timeOutMS;
  }

  public addTime(delta: number): void {
    if (this.isStopped) {
      return;
    }

    this.currentTimeMS += delta * 1000;

    if (this.currentTimeMS >= this.timeOutMS) {
      this.callBack();
      this.resetCurrentTime();
    }
  }

  public resetCurrentTime(): void {
    this.currentTimeMS = 0;
  }

  public start(): void {
    this.isStopped = false;
  }

  public stop(): void {
    this.isStopped = true;
    this.resetCurrentTime();
  }
}
