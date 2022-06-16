import { loadImageFromUrl } from "@/game/utils";
import { SpriteSheet } from "@/game/engine/SpriteSheet";
import { SpriteSheetSprite } from "@/game/engine/SpriteSheetSprite";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import bombSheet from "@/assets/images/sprites/bomb.png";
import { KeyListener } from "@/game/engine/KeyListener";

export class Bomb implements IEntity {
  public readonly id = Symbol("id");
  public static readonly width = 48;
  public static readonly height = 48;

  private sprite!: SpriteSheetSprite;

  private readonly xPos!: number;
  private readonly yPos!: number;

  private timeBeforeExplosionMS = 3000;
  private minBlinkOpacity = 0.6;
  private blinkTimeMS = 300;
  private currBlinkTimeMS!: number;

  private callback!: () => void;

  constructor(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.currBlinkTimeMS = this.blinkTimeMS;
  }

  public async setup(): Promise<void> {
    const sheetImage = await loadImageFromUrl(bombSheet);
    const sheet = new SpriteSheet(sheetImage, Bomb.width, Bomb.height);
    this.sprite = new SpriteSheetSprite(sheet, 0, 0);
    return Promise.resolve();
  }

  public subscribeToRemoveBomb(callback: () => void): void {
    this.callback = callback;
  }

  public render(
    context: CanvasRenderingContext2D,
    _: KeyListener,
    delta: number
  ): void {
    if (!this.sprite) {
      return;
    }

    this.timeBeforeExplosionMS -= delta * 1000;
    this.currBlinkTimeMS -= delta * 1000;

    if (this.currBlinkTimeMS <= -this.blinkTimeMS) {
      this.currBlinkTimeMS = this.blinkTimeMS;
    }

    if (this.timeBeforeExplosionMS <= 0) {
      this.callback();
    }

    this.sprite.render(
      context,
      0,
      this.xPos,
      this.yPos,
      Bomb.width,
      Bomb.height,
      { opacity: this.getOpacity() }
    );
  }

  private getOpacity(): number {
    const opacityVariance = 1 - this.minBlinkOpacity;
    const opacityValue =
      (Math.abs(this.currBlinkTimeMS) / this.blinkTimeMS) * opacityVariance;
    return this.minBlinkOpacity + opacityValue;
  }
}
