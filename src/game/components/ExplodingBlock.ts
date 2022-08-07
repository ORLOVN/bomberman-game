import { loadImageFromUrl } from "@/game/utils";
import { SpriteSheet } from "@/game/engine/SpriteSheet";
import eBlockImage from "@/assets/images/sprites/eblock.png";
import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { entityManager } from "@/game/engine/EntityManager";
import EntityTypes from "@/game/engine/enums/EntityTypes";
import { Collidable } from "@/game/engine/collision/Collidable";
import { gameManager } from "@/game/engine/GameManager/GameManager";
import { EScoreTypes } from "@/game/engine/GameManager/types";

export class ExplodingBlock implements IEntity {
  public readonly id = Symbol("id");
  public width = 64;
  public height = 64;

  private readonly xPos: number;
  private readonly yPos: number;
  private sheet?: SpriteSheet;
  // @ts-ignore
  private collisionBox: Collidable = new Collidable(
    this,
    EntityTypes.explodingBlock
  )
    .addGetGeometry(this.getCollisionGeometry.bind(this))
    .addCollisionStarted(this.collisionStarted.bind(this));

  constructor(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  public async setup(): Promise<void> {
    const img = await loadImageFromUrl(eBlockImage);
    this.sheet = new SpriteSheet(img, this.width, this.height);
  }

  public render(context: CanvasRenderingContext2D): void {
    this.sheet?.render(
      context,
      0,
      0,
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );
  }

  public die(): void {
    entityManager.removeEntity(this.id);
    this.collisionBox.remove();
    gameManager.addScore(EScoreTypes.EBLOCK);
  }

  public getCollisionGeometry(): ICollisionGeometry {
    return {
      xPos: this.xPos,
      yPos: this.yPos,
      xVel: 0,
      yVel: 0,
      width: this.width,
      height: this.height,
    };
  }

  public collisionStarted(metCollidable: Collidable) {
    if (metCollidable.type === EntityTypes.flame) {
      this.die();
    }
  }
}
