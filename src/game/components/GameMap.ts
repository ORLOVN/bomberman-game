import { IEntity } from "@/game/engine/interfaces/IEntity";
import { loadImageFromUrl } from "@/game/utils";
import bgImage from "@/assets/images/sprites/bg.png";
import { entityManager } from "@/game/engine/EntityManager";

export class GameMap implements IEntity {
  public readonly id = Symbol("id");
  private tileImage?: HTMLImageElement;
  private readonly width: number;
  private readonly height: number;
  private readonly tileSize: number;

  constructor(width: number, height: number, tileSize: number) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
  }

  public async setup() {
    this.tileImage = await loadImageFromUrl(bgImage);
  }

  public render(context: CanvasRenderingContext2D): void {
    if (!this.tileImage) {
      return
    }
    const tileCountX = Math.ceil(this.width / this.tileSize);
    const tileCountY = Math.ceil(this.height / this.tileSize);

    for (let y = 0; y < tileCountY; y += 1) {
      for (let x = 0; x < tileCountX; x += 1) {
        context.drawImage(
          this.tileImage,

          x * this.tileSize,
          y * this.tileSize,
          this.tileSize,
          this.tileSize
        );
      }
    }
  }

  public die(): void {
    entityManager.removeEntity(this.id);
  }
}
