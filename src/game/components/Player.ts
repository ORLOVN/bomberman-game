import {loadImageFromUrl} from "@/game/utils";
import {KeyListener} from "@/game/engine/KeyListener";
import {SpriteSheet} from "@/game/engine/SpriteSheet";
import {ISpritesDirections} from '@/game/engine/interfaces/ISpritesDirections';
import {ISprite} from '@/game/engine/interfaces/ISprite';
import {Animation} from "@/game/engine/Animation";
import {Range} from "@/game/engine/Range";
import {SpriteSheetSprite} from "@/game/engine/SpriteSheetSprite";
import playerSpriteSheet from "@/assets/images/sprites/player_spritesheet.png";
import {IEntity} from "@/game/engine/interfaces/IEntity";
import {ICollisionBox} from "@/game/engine/collision/interfaces/ICollisionBox";
import {entityManager} from "@/game/engine/EntityManager";
import {Bomb} from "@/game/components/Bomb";
import {collisionHandler} from '@/game/engine/collision/CollisionHandler';

export class Player implements IEntity {
  public readonly id = Symbol("id");
  private sprites!: ISpritesDirections;
  private currentSprite!: ISprite;

  private xPos = 64;
  private yPos = 0;
  private width = 64;
  private height = 128;
  private bombCount = 0;

  private speed = 150;
  private velX = 0;
  private velY = 0;

  public async setup(): Promise<void> {
    const spriteSheetImage = await loadImageFromUrl(playerSpriteSheet);
    const spriteSheet = new SpriteSheet(spriteSheetImage, this.width, this.height);

    this.sprites = {
      idle: new SpriteSheetSprite(spriteSheet, 0, 0),
      forward: new Animation(spriteSheet, Range.rowRange(0, 8)),
      backward: new Animation(spriteSheet, Range.rowRange(1, 8)),
      right: new Animation(spriteSheet, Range.rowRange(2, 8)),
      left: new Animation(spriteSheet, Range.rowRange(2, 8), undefined, {
        flippedX: true,
      }),
    };
  }

  public render(
    context: CanvasRenderingContext2D,
    keyListener: KeyListener,
    delta: number
  ): void {
    this.updatePositions(keyListener, delta);

    this.currentSprite.render(
      context,
      delta,
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );
  }

  private updatePositions(keyListener: KeyListener, delta: number): void {
    this.velX = 0;
    this.velY = 0;
    this.currentSprite = this.sprites.idle;

    if (keyListener.isKeyRight) {
      this.velX = this.speed * delta;
      this.currentSprite = this.sprites.right;
    } else if (keyListener.isKeyLeft) {
      this.velX = -(this.speed * delta);
      this.currentSprite = this.sprites.left;
    }

    if (keyListener.isKeyBottom) {
      this.velY = this.speed * delta;
      this.currentSprite = this.sprites.forward;
    } else if (keyListener.isKeyTop) {
      this.velY = -(this.speed * delta);
      this.currentSprite = this.sprites.backward;
    }

    if (keyListener.isKeyEnter) {
      if (this.bombCount < 3) {
        this.bombCount += 1;
        const bomb = new Bomb(
          this.xPos + (this.width / 2) - (Bomb.width / 2),
          this.yPos + this.height - Bomb.width
        );
        bomb.setup().then(() => {
          entityManager.addEntity(bomb);
          bomb.subscribeToRemoveBomb(() => {
            entityManager.removeEntity(bomb.id);
            this.bombCount -= 1;
          });
        });
        keyListener.resetKeyManually("Enter");
        keyListener.resetKeyManually("e");
      }
    }

    this.calculateCollision();

    this.xPos += this.velX;
    this.yPos += this.velY;
  }

  private calculateCollision(): void {
    const collisionBox: ICollisionBox = {
      xPos: this.xPos + 10,
      yPos: this.yPos + 100,
      width: this.width - 20,
      height: this.height - 105,
    };

    const collisionsX = collisionHandler.findCollisions(
      collisionBox,
      this.velX,
      0
    );

    if (collisionsX.length > 0) {
      this.velX = 0;
    }

    const collisionsY = collisionHandler.findCollisions(
      collisionBox,
      0,
      this.velY
    );

    if (collisionsY.length > 0) {
      this.velY = 0;
    }
  }
}
