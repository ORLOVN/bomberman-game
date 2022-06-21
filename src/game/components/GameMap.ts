import {IEntity} from '@/game/engine/interfaces/IEntity';
import {loadImageFromUrl} from '@/game/utils';
import bgImage from '@/assets/images/sprites/bg.png';
import {entityManager} from '@/game/engine/EntityManager';

export class GameMap implements IEntity {
  public readonly id = Symbol('id');
  private tileImage!: HTMLImageElement;
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public async setup() {
    this.tileImage = await loadImageFromUrl(bgImage);
  }

  public render(context: CanvasRenderingContext2D): void {
    const tileSize = 64;
    const tileCountX = Math.ceil(this.width / tileSize);
    const tileCountY = Math.ceil(this.height / tileSize);

    for (let y = 0; y < tileCountY; y += 1) {
      for (let x = 0; x < tileCountX; x += 1) {
        context.drawImage(this.tileImage, x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }

  public die(): void {
    entityManager.removeEntity(this.id);
  }
}
