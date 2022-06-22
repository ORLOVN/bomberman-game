import { MutableRefObject } from "react";
import { isCanvasElement, isCollidable } from "@/game/utils";
import { GameMap } from "@/game/components/GameMap";
import { Player } from "@/game/components/Player";
import { InitialScreen } from "@/game/components/InitialScreen";
import { KeyListener } from "@/game/engine/KeyListener";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { entityManager } from "@/game/engine/EntityManager";
import { brickManager } from "@/game/engine/BrickManager";
import { collisionHandler } from "@/game/engine/collision/CollisionHandler";
import { bombManager } from '@/game/engine/BombManager';
import FullscreenService from '@/services/fullscreen-service';
import { LevelGenerator } from "@/game/engine/LevelGenerator/LevelGenerator";

export class Game {
  private readonly context: CanvasRenderingContext2D;
  private readonly canvasElement: HTMLCanvasElement;
  private readonly width: number;
  private readonly height: number;
  private readonly tileSize: number;
  private readonly keyListener: KeyListener;
  private unsubscriptionLoop!: number;

  private lastTime!: number;

  constructor(
    canvasRef: MutableRefObject<HTMLCanvasElement>,
    tileSize: number,
  ) {
    const context = canvasRef.current.getContext("2d");

    if (!isCanvasElement(context)) {
      throw new Error("Couldn't find the canvas element");
    }

    this.context = context;
    this.canvasElement = canvasRef.current;
    this.width = canvasRef.current.width;
    this.height = canvasRef.current.height;
    this.tileSize = tileSize;
    this.keyListener = new KeyListener(canvasRef.current);
  }

  public async runInitialScreen(): Promise<void> {
    this.unsubscribe();

    this.keyListener.setup();

    this.addEntity(
      new InitialScreen(this.context).addOnStartHandler(() => {
        this.run(1);
      })
    );

    await entityManager.setupEntities();

    this.lastTime = performance.now();

    this.loop(performance.now());
  }

  public async run(level: number): Promise<void> {
    this.unsubscribe();

    await this.setup(level);

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
    bombManager.clear();
  }

  private async setup(level: number): Promise<void> {
    this.keyListener.setup();

    this.addEntity(new GameMap(this.width, this.height, this.tileSize));
    brickManager.addCurbBricks(
      this.width,
      this.height,
      this.addEntity.bind(this)
    );

    await LevelGenerator.generate(level, this.tileSize);

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
    this.unsubscriptionLoop = window.requestAnimationFrame(
      this.loop.bind(this)
    );
  }
}
