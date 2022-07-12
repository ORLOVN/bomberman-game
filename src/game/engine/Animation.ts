import { SpriteSheet } from "@/game/engine/SpriteSheet";
import { ISprite } from "@/game/engine/interfaces/ISprite";
import { IRenderImageOptions } from "@/game/engine/interfaces/IRenderImageOptions";

type Frame = [number, number];

export class Animation implements ISprite {
  private spriteSheet: SpriteSheet;
  private readonly frames: Frame[];
  private readonly msPerFrame: number;
  private readonly renderImageOptions: IRenderImageOptions;

  private currentFrameIndex: number = 0;
  private msInCurrentFrame: number = 0;

  constructor(
    spriteSheet: SpriteSheet,
    frames: Frame[],
    msPerFrame: number = 100,
    renderImageOptions: IRenderImageOptions = {}
  ) {
    this.spriteSheet = spriteSheet;
    this.frames = frames;
    this.msPerFrame = msPerFrame;
    this.renderImageOptions = renderImageOptions;
  }

  render(
    context: CanvasRenderingContext2D,
    delta: number,
    x: number,
    y: number,
    width: number,
    height: number
  ): void {
    this.updateFrame(delta);

    const currentFrame = this.frames[this.currentFrameIndex];
    this.spriteSheet.render(
      context,
      currentFrame[0],
      currentFrame[1],
      x,
      y,
      width,
      height,
      this.renderImageOptions
    );
  }

  private updateFrame(delta: number): void {
    this.msInCurrentFrame += delta * 1000;

    if (this.msInCurrentFrame >= this.msPerFrame) {
      this.msInCurrentFrame -= this.msPerFrame;
      this.currentFrameIndex += 1;
      if (this.currentFrameIndex >= this.frames.length) {
        this.currentFrameIndex = 0;
      }
    }
  }
}
