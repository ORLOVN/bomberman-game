import { IRenderImageOptions } from "@/game/engine/interfaces/IRenderImageOptions";

export interface ISprite {
  render(
    context: CanvasRenderingContext2D,
    delta: number,
    x: number,
    y: number,
    width: number,
    height: number,
    renderImageOptions?: IRenderImageOptions
  ): void;
}
