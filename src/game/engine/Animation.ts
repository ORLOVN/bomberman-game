import { SpriteSheet } from "@/game/engine/SpriteSheet";
import {ISprite} from '@/game/engine/interfaces/ISprite';

type Frame = [number, number];

export class Animation implements ISprite {
  private spriteSheet: SpriteSheet;
  private readonly frames: Frame[];
  private readonly msPerFrame: number;
  private readonly flippedX: boolean;

  private currentFrameIndex: number = 0;
  private msInCurrentFrame: number = 0;

  constructor(
    spriteSheet: SpriteSheet,
    frames: Frame[],
    msPerFrame = 100,
    { flippedX = false }: { flippedX?: boolean } = {}
  ) {
    this.spriteSheet = spriteSheet;
    this.frames = frames;
    this.msPerFrame = msPerFrame;
    this.flippedX = flippedX;
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
      { flippedX: this.flippedX }
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
