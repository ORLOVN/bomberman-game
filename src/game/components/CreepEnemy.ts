import { loadImageFromUrl } from "@/game/utils";
import { KeyListener } from "@/game/engine/KeyListener";
import { SpriteSheet } from "@/game/engine/SpriteSheet";
import { ISpritesDirections } from "@/game/engine/interfaces/ISpritesDirections";
import { ISprite } from "@/game/engine/interfaces/ISprite";
import { Animation } from "@/game/engine/Animation";
import { Range } from "@/game/engine/Range";
import { SpriteSheetSprite } from "@/game/engine/SpriteSheetSprite";
import creepSpriteSheet from "@/assets/images/sprites/creep_spritesheet.png";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { entityManager } from "@/game/engine/EntityManager";
import { ICollision } from "@/game/engine/collision/interfaces/ICollision";
import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import EntityTypes from "@/game/engine/enums/EntityTypes";
import { Collidable } from "@/game/engine/collision/Collidable";
import {gameManager} from '@/game/engine/GameManager/GameManager';
import {EScoreTypes} from '@/game/engine/GameManager/types';

export class CreepEnemy implements IEntity {
  public readonly id = Symbol("id");
  private sprites!: ISpritesDirections;
  private currentSprite!: ISprite;

  private xPos = 64;
  private yPos = 0;
  private width = 64;
  private height = 64;
  private xVel = 0;
  private yVel = 0;
  private collisionBox: Collidable = new Collidable(this, EntityTypes.enemy)
    .addGetGeometry(this.getCollisionGeometry.bind(this))
    .addCollisionStarted(this.collisionStarted.bind(this))
    .addCollisionDetected(this.collisionDetected.bind(this));
  constructor(xPos: number, yPos: number) {
    this.xPos = xPos;
    this.yPos = yPos;
  }

  public async setup(): Promise<void> {
    const spriteSheetImage = await loadImageFromUrl(creepSpriteSheet);
    const spriteSheet = new SpriteSheet(
      spriteSheetImage,
      this.width,
      this.height
    );

    this.sprites = {
      idle: new SpriteSheetSprite(spriteSheet, 0, 0),
      forward: new Animation(spriteSheet, Range.rowRange(0, 6)),
      backward: new Animation(spriteSheet, Range.rowRange(1, 6)),
      right: new Animation(spriteSheet, Range.rowRange(2, 6)),
      left: new Animation(spriteSheet, Range.rowRange(2, 6), undefined, {
        flippedX: true,
      }),
    };

    this.currentSprite = this.sprites.idle;
  }

  public render(
    context: CanvasRenderingContext2D,
    keyListener: KeyListener,
    delta: number
  ): void {
    // TODO: update positions

    this.currentSprite.render(
      context,
      delta,
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );
  }

  public die(): void {
    entityManager.removeEntity(this.id);
    this.collisionBox.remove();
    gameManager.addScore(EScoreTypes.CREEP);
  }

  private getCollisionGeometry(): ICollisionGeometry {
    return {
      xPos: this.xPos,
      yPos: this.yPos,
      xVel: this.xVel,
      yVel: this.yVel,
      width: 40,
      height: 20,
    };
  }

  private collisionDetected(metCollidable: Collidable, collision: ICollision) {
    if (
      metCollidable.type === EntityTypes.brick ||
      metCollidable.type === EntityTypes.explodingBlock
    ) {
      this.xVel = collision.xOffset === 0 ? this.xVel : 0;
      this.yVel = collision.yOffset === 0 ? this.yVel : 0;
    }
  }

  private collisionStarted(metCollidable: Collidable) {
    if (metCollidable.type === EntityTypes.flame) {
      this.die();
    }
  }
}
