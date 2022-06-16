import {IRenderImageOptions} from '@/game/engine/interfaces/IRenderImageOptions';

export class SpriteSheet {
  private readonly image: HTMLImageElement;
  private readonly spriteWidth: number;
  private readonly spriteHeight: number;

  constructor(image: HTMLImageElement, spriteWidth: number, spriteHeight: number) {
    this.image = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
  }

  public render(
    context: CanvasRenderingContext2D,
    xCount: number,
    yCount: number,
    x: number,
    y: number,
    width: number,
    height: number,
    {flippedX = false, opacity}: IRenderImageOptions = {}
  ): void {
    let renderedX = x;

    if (flippedX) {
      context.save();
      context.scale(-1, 1);
      renderedX = -(x + width);
    }

    if (opacity) {
      context.globalAlpha = opacity;
    }

    context.drawImage(
      this.image,
      xCount * this.spriteWidth,
      yCount * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      renderedX,
      y,
      width,
      height
    );

    if (opacity) {
      context.globalAlpha = 1;
    }

    if (flippedX) {
      context.restore();
    }
  }
}
