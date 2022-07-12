import { calcTileCenter, loadImageFromUrl } from "@/game/utils";
import { SpriteSheet } from "@/game/engine/SpriteSheet";
import { SpriteSheetSprite } from "@/game/engine/SpriteSheetSprite";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { KeyListener } from "@/game/engine/KeyListener";
import { entityManager } from "@/game/engine/EntityManager";
import bombSheet from "@/assets/images/sprites/bomb.png";
import EntityTypes from "@/game/engine/enums/EntityTypes";
import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import { TILE_SIZE } from "@/game/constants/gameConstants";
import { Collidable } from "@/game/engine/collision/Collidable";
import { entityFactory } from "@/game";

type Resources =
  | {
      spriteImage: HTMLImageElement;
    }
  | undefined;

export class Bomb implements IEntity {
  public readonly id = Symbol("id");
  private readonly width = 48;
  private readonly height = 48;

  private sprite!: SpriteSheetSprite;

  private resources: Resources | undefined;

  private readonly xPos!: number;
  private readonly yPos!: number;

  private timeBeforeExplosionMS = 3000;
  private minBlinkOpacity = 0.6;
  private blinkTimeMS = 300;
  private currBlinkTimeMS!: number;
  // @ts-ignore
  private collisionBox: Collidable = new Collidable(this, EntityTypes.bomb)
    .addGetGeometry(this.getCollisionGeometry.bind(this))
    .addCollisionStarted(this.collisionStarted.bind(this));

  constructor(xPos: number, yPos: number) {
    const { x, y } = calcTileCenter(TILE_SIZE, xPos, yPos);
    this.xPos = x;
    this.yPos = y;
    this.currBlinkTimeMS = this.blinkTimeMS;
  }

  public async setup(): Promise<void> {
    if (!this.resources) {
      const spriteSheetImage = await loadImageFromUrl(bombSheet);
      this.resources = { spriteImage: spriteSheetImage };
    }
    const sheet = new SpriteSheet(
      this.resources.spriteImage,
      this.width,
      this.height
    );
    this.sprite = new SpriteSheetSprite(sheet, 0, 0);
    return Promise.resolve();
  }

  public reuseResources(resources: Resources) {
    this.resources = resources;
    this.setup();
    return this;
  }

  public shareResources() {
    return this.resources;
  }

  public onRemoval() {}

  public addOnRemovalHandler(onRemovalHandler: () => void) {
    this.onRemoval = onRemovalHandler;
    return this;
  }

  public render(
    context: CanvasRenderingContext2D,
    _: KeyListener,
    delta: number
  ): void {
    this.timeBeforeExplosionMS -= delta * 1000;
    this.currBlinkTimeMS -= delta * 1000;

    if (this.currBlinkTimeMS <= -this.blinkTimeMS) {
      this.currBlinkTimeMS = this.blinkTimeMS;
    }

    if (this.timeBeforeExplosionMS <= 0) {
      entityFactory.produceFlame(this.xPos, this.yPos, "all", 2);
      this.die();
    }

    this.sprite.render(
      context,
      0,
      this.xPos,
      this.yPos,
      this.width,
      this.height,
      { opacity: this.getOpacity() }
    );
  }

  public die(): void {
    this.onRemoval();
    entityManager.removeEntity(this.id);
    this.collisionBox.remove();
  }

  private getOpacity(): number {
    const opacityVariance = 1 - this.minBlinkOpacity;
    const opacityValue =
      (Math.abs(this.currBlinkTimeMS) / this.blinkTimeMS) * opacityVariance;
    return this.minBlinkOpacity + opacityValue;
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
      this.timeBeforeExplosionMS = 0;
    }
  }
}
