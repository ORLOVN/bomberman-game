import { loadImageFromUrl } from "@/game/utils";
import { KeyListener } from "@/game/engine/KeyListener";
import { SpriteSheet } from "@/game/engine/SpriteSheet";
import { ISpritesDirections } from "@/game/engine/interfaces/ISpritesDirections";
import { ISprite } from "@/game/engine/interfaces/ISprite";
import { Animation } from "@/game/engine/Animation";
import { Range } from "@/game/engine/Range";
import { SpriteSheetSprite } from "@/game/engine/SpriteSheetSprite";
import playerSpriteSheet from "@/assets/images/sprites/player_spritesheet.png";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import { entityManager } from "@/game/engine/EntityManager";
import EntityTypes from "@/game/engine/enums/EntityTypes";
import { Bomb } from "@/game/components/Bomb";
import { Collidable } from "@/game/engine/collision/Collidable";
import { ICollision } from "@/game/engine/collision/interfaces/ICollision";

enum BehaviourMode {
  normal,
  dying,
}

export class Player implements IEntity {
  public readonly id = Symbol("id");
  public readonly type: EntityTypes = EntityTypes.player;
  private sprites?: ISpritesDirections;
  private currentSprite?: ISprite;
  private dieSprite?: ISprite;


  private xPos = 64 + 64 / 2;
  private yPos = 64 + 64 / 2;
  private width = 64;
  private height = 128;
  private bombCount = 3;

  private behaviourMode: BehaviourMode = BehaviourMode.normal;

  private speed = 150;
  private xVel = 0;
  private yVel = 0;
  private entityFactory = require("@/game/engine/EntityFactory").entityFactory;
  private resentBomb: Bomb | undefined;
  private collisionBox: Collidable = new Collidable(this, EntityTypes.player)
    .addGetGeometry(this.getCollisionGeometry.bind(this))
    .addCollisionStarted(this.collisionStarted.bind(this))
    .addCollisionDetected(this.collisionDetected.bind(this))
    .addCollisionLeaved(this.collisionLeaved.bind(this));

  private onDie?: () => void;

  public addOnDie(func: () => void) {
    this.onDie = func;
    return this;
  }

  public async setup(): Promise<void> {
    const spriteSheetImage = await loadImageFromUrl(playerSpriteSheet);
    const spriteSheet = new SpriteSheet(
      spriteSheetImage,
      this.width,
      this.height
    );

    this.sprites = {
      idle: new SpriteSheetSprite(spriteSheet, 0, 0),
      forward: new Animation(spriteSheet, Range.rowRange(0, 8)),
      backward: new Animation(spriteSheet, Range.rowRange(1, 8)),
      right: new Animation(spriteSheet, Range.rowRange(2, 8)),
      left: new Animation(spriteSheet, Range.rowRange(2, 8), undefined, {
        flippedX: true,
      }),
    };
    this.dieSprite = new Animation(
      spriteSheet,
      Range.rowRange(3, 8),
      100,
      undefined,
      false
    ).addOnAnimationEnd(() => {
      this.unsubscribe()
    });

  }

  public render(
    context: CanvasRenderingContext2D,
    keyListener: KeyListener,
    delta: number
  ): void {
    if (this.behaviourMode === BehaviourMode.normal) {
      this.updatePositions(keyListener, delta);
    }

    this.currentSprite?.render(
      context,
      delta,
      this.xPos,
      this.yPos,
      this.width,
      this.height,
    );
  }

  public die(): void {
    this.behaviourMode = BehaviourMode.dying;
    this.currentSprite = this.dieSprite;
  }


  private updatePositions(keyListener: KeyListener, delta: number): void {
    if (!this.sprites) {
      return
    }
    this.xVel = 0;
    this.yVel = 0;
    this.currentSprite = this.sprites.idle;

    if (keyListener.isAnyKeyPressed(["d", "ArrowRight"])) {
      this.xVel = this.speed * delta;
      this.currentSprite = this.sprites.right;
    } else if (keyListener.isAnyKeyPressed(["a", "ArrowLeft"])) {
      this.xVel = -(this.speed * delta);
      this.currentSprite = this.sprites.left;
    }

    if (keyListener.isAnyKeyPressed(["s", "ArrowDown"])) {
      this.yVel = this.speed * delta;
      this.currentSprite = this.sprites.forward;
    } else if (keyListener.isAnyKeyPressed(["w", "ArrowUp"])) {
      this.yVel = -(this.speed * delta);
      this.currentSprite = this.sprites.backward;
    }

    if (keyListener.isAnyKeyPressed(["e", "Enter"])) {
      if (!this.resentBomb && this.bombCount > 0) {
        this.bombCount -= 1;
        this.resentBomb = this.entityFactory
          .produceBomb(this.xPos, this.yPos + 48)
          .addOnRemovalHandler(() => {
            this.bombCount += 1;
          });
      }
      keyListener.resetKeysManually(["e", "Enter"]);
    }

    this.collisionBox.checkCollisions();

    this.xPos += this.xVel;
    this.yPos += this.yVel;
  }

  public getCollisionGeometry(): ICollisionGeometry {
    return {
      xPos: this.xPos,
      yPos: this.yPos + 48,
      xVel: this.xVel,
      yVel: this.yVel,
      width: 40,
      height: 20,
    };
  }

  public unsubscribe(): void {
    entityManager.removeEntity(this.id);
    this.collisionBox.remove();
    this.onDie?.()
  }

  private collisionDetected(metCollidable: Collidable, collision: ICollision) {
    if (
      metCollidable.type === EntityTypes.brick ||
      metCollidable.type === EntityTypes.explodingBlock
    ) {
      this.xVel = collision.xOffset === 0 ? this.xVel : 0;
      this.yVel = collision.yOffset === 0 ? this.yVel : 0;
    }

    if (
      metCollidable.type === EntityTypes.bomb &&
      this.resentBomb !== metCollidable.owner
    ) {
      this.xVel = collision.xOffset === 0 ? this.xVel : 0;
      this.yVel = collision.yOffset === 0 ? this.yVel : 0;
    }

  }

  private collisionStarted(metCollidable: Collidable) {
    if (metCollidable.type === EntityTypes.flame || metCollidable.type === EntityTypes.enemy) {
      this.die();
    }
  }

  private collisionLeaved(collidable: Collidable) {
    if (collidable.owner === this.resentBomb) {
      this.resentBomb = undefined;
    }
  }
}
