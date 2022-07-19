import { MutableRefObject } from "react";
import { isCanvasElement } from "@/game/utils";
import { GameMap } from "@/game/components/GameMap";
import { Player } from "@/game/components/Player";
import { InitialScreen } from "@/game/components/InitialScreen";
import { KeyListener } from "@/game/engine/KeyListener";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { entityManager } from "@/game/engine/EntityManager";
import { brickManager } from "@/game/engine/BrickManager";
import { collisionHandler } from "@/game/engine/collision/CollisionHandler";
import FullscreenService from "@/services/fullscreen-service";
import { LevelGenerator } from "@/game/engine/LevelGenerator/LevelGenerator";
import { entityFactory } from "@/game/engine/EntityFactory";
import { Brick } from "@/game/components/Brick";
import { TILE_SIZE } from "@/game/constants/gameConstants";
import { gameManager } from "@/game/engine/GameManager/GameManager";
import { Timer } from "@/game/engine/Timer";
import EntityTypes from "@/game/engine/enums/EntityTypes";

export class Game {
  private readonly context: CanvasRenderingContext2D;
  private readonly canvasElement: HTMLCanvasElement;
  private readonly width: number;
  private readonly height: number;
  private readonly keyListener: KeyListener;
  private unsubscriptionLoop!: number;

  private lastTime!: number;
  private isLoopStopped = true;
  private timer: Timer;

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

    this.timer = new Timer(() => {
      gameManager.addTime();
    }, 1000);

    gameManager.onTimeOver(() => {
      const player = entityManager.getEntityByType(EntityTypes.player);

      player?.die();
    });
  }

  public async runInitialScreen(): Promise<void> {
    this.unsubscribe();

    this.keyListener.setup();

    this.addEntity(
      new InitialScreen(this.context).addOnStartHandler(this.run.bind(this, 1))
    );

    await entityManager.setupEntities();

    this.startLoop();
  }

  public async runTestLevel(): Promise<void> {
    this.unsubscribe();

    this.keyListener.setup();

    this.addEntity(new GameMap(this.width, this.height, TILE_SIZE));

    this.addEntity(new Brick(100, 100));

    this.addEntity(new Brick(100, 164));

    this.addEntity(new Player());

    await entityFactory.setup();

    await entityManager.setupEntities();

    collisionHandler.debugMode(this.context);

    this.startLoop();
  }

  public async run(level: number, continueGame = false): Promise<void> {
    this.unsubscribe(continueGame);

    await this.setup(level);

    await entityManager.setupEntities();
    collisionHandler.debugMode(this.context);

    gameManager.showGamePanel(true);

    this.startLoop();
  }

  public addEntity(entity: IEntity) {
    entityManager.addEntity(entity);
  }

  public unsubscribe(continueGame = false): void {
    this.stopLoop();
    this.keyListener.unsubscribe();
    entityManager.clear();
    collisionHandler.clear();

    if (!continueGame) {
      gameManager.unsubscribe();
    }
  }

  private async setup(level: number): Promise<void> {
    this.keyListener.setup();

    this.addEntity(new GameMap(this.width, this.height, TILE_SIZE));

    await entityFactory.setup();

    brickManager.addCurbBricks(
      this.width,
      this.height,
      this.addEntity.bind(this)
    );

    await LevelGenerator.generate(level, TILE_SIZE);

    const player = new Player();

    this.addEntity(player);

    player.onDie(this.onPLayerDie.bind(this, level));
  }

  private onPLayerDie(level: number): void {
    this.timer.stop();
    gameManager.reduceLeftLives();

    if (!gameManager.isGameOver) {
      this.run(level, true);
    } else {
      this.runInitialScreen();
    }
  }

  private loop(currentTime: number): void {
    if (this.isLoopStopped) {
      return;
    }

    const delta = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;

    this.timer.addTime(delta);

    if (this.keyListener.isAnyKeyPressed(["q"])) {
      FullscreenService.toggle(this.canvasElement.parentElement as HTMLElement);
      this.keyListener.resetKeysManually(["q"]);
    }

    entityManager.renderEntities(this.context, this.keyListener, delta);
    this.unsubscriptionLoop = window.requestAnimationFrame(
      this.loop.bind(this)
    );
  }

  private startLoop(): void {
    gameManager.addTime(10);

    this.lastTime = performance.now();

    this.isLoopStopped = false;

    this.timer.start();

    this.loop(performance.now());
  }

  private stopLoop(): void {
    window.cancelAnimationFrame(this.unsubscriptionLoop);

    this.isLoopStopped = true;
  }
}
