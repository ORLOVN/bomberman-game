import {MutableRefObject} from "react";
import {isCanvasElement, isCollidable} from "@/game/utils";
import {GameMap} from "@/game/components/GameMap";
import {Player} from "@/game/components/Player";
import {KeyListener} from "@/game/engine/KeyListener";
import {IEntity} from "@/game/engine/interfaces/IEntity";
import {entityManager} from "@/game/engine/EntityManager";
import {brickManager} from '@/game/engine/BrickManager';
import {collisionHandler} from '@/game/engine/collision/CollisionHandler';
import FullscreenService from '@/services/fullscreen-service';

export class Game {
  private readonly context: CanvasRenderingContext2D;
  private readonly canvasElement: HTMLCanvasElement;
  private readonly width: number;
  private readonly height: number;
  private readonly keyListener: KeyListener;
  private unsubscriptionLoop!: number;

  private lastTime!: number;

  constructor(canvasRef: MutableRefObject<HTMLCanvasElement>) {
    const context = canvasRef.current.getContext("2d");

    if (!isCanvasElement(context)) {
      throw new Error("Couldn't find the canvas element");
    }

    this.context = context;
    this.canvasElement = canvasRef.current;
    this.width = canvasRef.current.width;
    this.height = canvasRef.current.height;
    this.keyListener = new KeyListener(canvasRef.current);
  }

  public async run(): Promise<void> {
    await this.setup();
    await entityManager.setupEntities();

    this.lastTime = performance.now();

    this.loop(performance.now());
  }

  public addEntity(entity: IEntity) {
    entityManager.addEntity(entity);

    if (isCollidable(entity)) {
      collisionHandler.addCollidable(entity);
    }
  }

  public unsubscribe(): void {
    this.keyListener.unsubscribe();
    window.cancelAnimationFrame(this.unsubscriptionLoop);
    entityManager.clear();
    collisionHandler.clear();
  }

  private async setup(): Promise<void> {
    this.keyListener.setup();

    this.addEntity(new GameMap(this.width, this.height));
    brickManager.addCurbBricks(this.width, this.height, this.addEntity.bind(this));
    this.addEntity(new Player());
  }

  private loop(currentTime: number): void {
    const delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    if (this.keyListener.isAnyKeyPressed(["q"])) {
      FullscreenService.toggle(this.canvasElement);
      this.keyListener.resetKeysManually(["q"]);
    }

    entityManager.renderEntities(this.context, this.keyListener, delta);
    this.unsubscriptionLoop = window.requestAnimationFrame(this.loop.bind(this));
  }
}
