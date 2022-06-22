import {loadImageFromUrl} from '@/game/utils';
import {SpriteSheet} from '@/game/engine/SpriteSheet';
import eBlockImage from '@/assets/images/sprites/eblock.png';
import {ICollidable} from '@/game/engine/collision/interfaces/ICollidable';
import {ICollisionBox} from '@/game/engine/collision/interfaces/ICollisionBox';
import {IEntity} from '@/game/engine/interfaces/IEntity';
import {entityManager} from '@/game/engine/EntityManager';


export class ExplodingBlock implements ICollidable, IEntity {
  public readonly id = Symbol('id');
  public width = 64;
  public height = 64;

  private readonly xPos: number;
  private readonly yPos: number;
  private sheet!: SpriteSheet;

  constructor(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  public async setup(): Promise<void> {
    const img = await loadImageFromUrl(eBlockImage);
    this.sheet = new SpriteSheet(img, this.width, this.height);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sheet.render(context, 0, 0, this.xPos, this.yPos, this.width, this.height);
  }

  public getCollisionBox(): ICollisionBox {
    return {
      xPos: this.xPos,
      yPos: this.yPos,
      width: this.width,
      height: this.height
    };
  }

  public die(): void {
    entityManager.removeEntity(this.id);
  }
}
