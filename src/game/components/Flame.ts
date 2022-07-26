import { calcTileCenter, loadImageFromUrl } from "@/game/utils";
import { SpriteSheet } from "@/game/engine/SpriteSheet";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { KeyListener } from "@/game/engine/KeyListener";
import { entityManager } from "@/game/engine/EntityManager";
import flameSheet from "@/assets/images/sprites/flame_spritesheet.png";
import { Animation } from "@/game/engine/Animation";
import { Range } from "@/game/engine/Range";
import { ISprite } from "@/game/engine/interfaces/ISprite";
import EntityTypes from "@/game/engine/enums/EntityTypes";
import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import { TILE_SIZE } from "@/game/constants/gameConstants";
import { Collidable } from "@/game/engine/collision/Collidable";
import { entityFactory } from "@/game";
import { Direction } from "@/game/types";

type Resources =
  | {
      spriteImage: HTMLImageElement;
    }
  | undefined;

export class Flame implements IEntity {
  public readonly id = Symbol("id");
  public readonly width = 48;
  public readonly height = 48;

  private sprite?: ISprite;

  private readonly xPos!: number;
  private readonly yPos!: number;

  private spreadDir: Direction;
  private spreadCount: number;
  private lifeTime: number = 0.5;
  private spreadTime: number = 0.1;
  private explosionDelay: number = 0.01;

  private resources?: Resources;

  private collisionBox: Collidable = new Collidable(this, EntityTypes.flame)
    .addGetGeometry(this.getCollisionGeometry.bind(this))
    .addCollisionStarted(this.collisionStarted.bind(this));
  private probe: Collidable = new Collidable(this, EntityTypes.probe)
    .addGetGeometry(this.getCollisionGeometry.bind(this))
    .addCollisionStarted(this.collisionStarted.bind(this));

  constructor(
    xPos: number,
    yPos: number,
    directionToSpread: Direction,
    spreadCount: number
  ) {
    this.spreadDir = directionToSpread;
    this.spreadCount = spreadCount;

    const { x, y } = calcTileCenter(TILE_SIZE, xPos, yPos);

    this.xPos = x;
    this.yPos = y;
  }

  public async setup(): Promise<void> {
    if (!this.resources) {
      const spriteSheetImage = await loadImageFromUrl(flameSheet);
      this.resources = { spriteImage: spriteSheetImage };
    }
    const spriteSheet = new SpriteSheet(
      this.resources.spriteImage,
      this.width,
      this.height
    );
    this.sprite = new Animation(spriteSheet, Range.rowRange(0, 4));
  }

  public setResources(resources: Resources) {
    this.resources = resources;
    this.setup();
    return this;
  }

  public shareResources() {
    return this.resources;
  }

  public render(
    context: CanvasRenderingContext2D,
    _: KeyListener,
    delta: number
  ): void {
    if (this.explosionDelay > 0) {
      this.probe.checkCollisions();
    } else {
      this.collisionBox.checkCollisions();
      this.sprite?.render(
        context,
        delta,
        this.xPos,
        this.yPos,
        this.width,
        this.height
      );
    }

    if (this.lifeTime < 0) {
      this.die();
    }

    if (this.spreadTime < 0 && this.spreadCount > 0) {
      this.spread();
    }

    this.lifeTime -= delta;
    this.spreadTime -= delta;
    this.explosionDelay -= delta;
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

  private collisionStarted(metCollidable: Collidable) {
    if (metCollidable.type === EntityTypes.explodingBlock) {
      this.spreadCount = 0;
    }
    if (metCollidable.type === EntityTypes.brick) {
      this.die();
    }
  }

  private spread() {
    const conductor =
      this.spreadDir === "all"
        ? (["up", "forward", "left", "right"] as Array<Direction>)
        : [this.spreadDir];
    conductor.forEach((dir) => {
      entityFactory.produceFlame(
        this.xPos +
          (dir === "left" ? -TILE_SIZE : 0) +
          (dir === "right" ? TILE_SIZE : 0),
        this.yPos +
          (dir === "up" ? -TILE_SIZE : 0) +
          (dir === "forward" ? TILE_SIZE : 0),
        dir,
        this.spreadCount - 1
      );
    });
    this.spreadCount = 0;
  }

  public die(): void {
    entityManager.removeEntity(this.id);
    this.collisionBox.remove();
  }
}
