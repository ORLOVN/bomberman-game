export class BlinkManager {
  private minBlinkOpacity = 0.6;
  private blinkTimeMS: number;
  private currentBlinkTimeMS: number;

  constructor(blinkTimeMS = 300) {
    this.blinkTimeMS = blinkTimeMS;
    this.currentBlinkTimeMS = this.blinkTimeMS;
  }

  public updateCurrentBlinkTime(delta: number): void {
    this.currentBlinkTimeMS -= delta * 1000;

    if (this.currentBlinkTimeMS <= -this.blinkTimeMS) {
      this.currentBlinkTimeMS = this.blinkTimeMS;
    }
  }

  public getOpacity(): number {
    const opacityVariance = 1 - this.minBlinkOpacity;
    const opacityValue =
      (Math.abs(this.currentBlinkTimeMS) / this.blinkTimeMS) * opacityVariance;
    return this.minBlinkOpacity + opacityValue;
  }
}
