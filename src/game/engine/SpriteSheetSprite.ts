import { SpriteSheet } from "@/game/engine/SpriteSheet";
import { ISprite } from "@/game/engine/interfaces/ISprite";
import { IRenderImageOptions } from "@/game/engine/interfaces/IRenderImageOptions";

export class SpriteSheetSprite implements ISprite {
  private readonly spriteSheet: SpriteSheet;
  private readonly flippedX: boolean;
  private readonly xCount: number;
  private readonly yCount: number;

  constructor(
    spriteSheet: SpriteSheet,
    xCount: number,
    yCount: number,
    { flippedX = false }: { flippedX?: boolean } = {}
  ) {
    this.spriteSheet = spriteSheet;
    this.xCount = xCount;
    this.yCount = yCount;
    this.flippedX = flippedX;
  }

  public render(
    context: CanvasRenderingContext2D,
    delta: number,
    x: number,
    y: number,
    width: number,
    height: number,
    renderImageOptions: IRenderImageOptions
  ): void {
    this.spriteSheet.render(
      context,
      this.xCount,
      this.yCount,
      x,
      y,
      width,
      height,
      { flippedX: this.flippedX, ...renderImageOptions }
    );
  }
}
