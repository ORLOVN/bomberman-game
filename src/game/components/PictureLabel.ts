import { IControl } from "@/game/engine/interfaces/IControl";

type Resources =
  | {
      spriteImage: HTMLImageElement;
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | undefined;

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class PictureLabel implements IControl {
  public readonly id = Symbol("id");
  private geometry: Rectangle;
  private excerpt: Rectangle;
  private scale: number;
  private context: CanvasRenderingContext2D;
  private sprite?: HTMLImageElement;

  constructor(
    x: number,
    y: number,
    scale: number,
    context: CanvasRenderingContext2D
  ) {
    this.geometry = {
      x,
      y,
      width: 0,
      height: 0,
    };

    this.excerpt = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };

    this.context = context;

    this.scale = scale;
  }

  public async setup(): Promise<void> {}

  public setResources(resources: Resources) {
    if (!resources) return;

    this.sprite = resources.spriteImage;

    this.excerpt = {
      x: resources.x,
      y: resources.y,
      width: resources.width,
      height: resources.height,
    };

    this.geometry.width = resources.width;
    this.geometry.height = resources.height;
  }

  public render(): void {
    const ctx = this.context;

    if (this.sprite) {
      ctx.save();

      ctx.drawImage(
        this.sprite,
        this.excerpt.x,
        this.excerpt.y,
        this.excerpt.width,
        this.excerpt.height,
        this.geometry.x,
        this.geometry.y,
        this.geometry.width * this.scale,
        this.geometry.height * this.scale
      );

      ctx.restore();
    }
  }
}
