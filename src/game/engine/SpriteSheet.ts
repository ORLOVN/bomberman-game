import { IRenderImageOptions } from "@/game/engine/interfaces/IRenderImageOptions";
import { developmentOptions } from "@/game/constants/gameConstants";

export class SpriteSheet {
  private readonly image: HTMLImageElement;
  private readonly spriteWidth: number;
  private readonly spriteHeight: number;

  constructor(
    image: HTMLImageElement,
    spriteWidth: number,
    spriteHeight: number
  ) {
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
    renderImageOptions: IRenderImageOptions = {}
  ): void {
    context.save();

    context.translate(x, y);

    if (renderImageOptions.flippedX) {
      context.scale(-1, 1);
    }

    if (renderImageOptions.rotated) {
      context.rotate((renderImageOptions.rotated * Math.PI) / 180);
    }

    if (renderImageOptions.opacity) {
      context.globalAlpha = renderImageOptions.opacity;
    }

    context.drawImage(
      this.image,
      xCount * this.spriteWidth,
      yCount * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      -width / 2,
      -height / 2,
      width,
      height
    );

    if (developmentOptions.showEntityCenter) {
      context.beginPath();
      context.lineWidth = 6;
      context.strokeStyle = "red";
      context.rect(-1, -1, 2, 2);
      context.stroke();
      context.fill();
    }

    context.restore();
  }
}
