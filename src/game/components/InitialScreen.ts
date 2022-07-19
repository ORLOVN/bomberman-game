import { loadImageFromUrl } from "@/game/utils";
import { SpriteSheet } from "@/game/engine/SpriteSheet";
import Poster from "@/assets/images/sprites/game_poster.jpg";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { Button } from "@/game/components/Button";
import { IControl } from "@/game/engine/interfaces/IControl";
import { KeyListener } from "@/game/engine/KeyListener";
import { entityManager } from "@/game/engine/EntityManager";

export class InitialScreen implements IEntity {
  public readonly id = Symbol("id");
  public width = 1536;
  public height = 786;
  private sheet!: SpriteSheet;
  private context: CanvasRenderingContext2D;
  private controls: Array<IControl> = [];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    const StartButton = new Button("START NEW GAME", 100, 500, this.context);
    StartButton.onClick = () => {
      this.onStart();
    };
    this.controls.push(StartButton);
    this.controls.push(new Button("LEADER BOARD", 100, 600, this.context));
  }

  private onStart() {}

  public addOnStartHandler(onStartHandler: () => void): InitialScreen {
    this.onStart = onStartHandler;
    return this;
  }

  public async setup(): Promise<void> {
    const img = await loadImageFromUrl(Poster);
    this.sheet = new SpriteSheet(img, 1920, 1078);
  }

  public render(
    context: CanvasRenderingContext2D,
    keyListener: KeyListener,
    delta: number
  ): void {
    this.sheet.render(
      context,
      0,
      0,
      this.width / 2,
      this.height / 2,
      this.width,
      this.height
    );
    this.controls.forEach((control) => control.render(delta));
  }

  public die(): void {
    entityManager.removeEntity(this.id);
  }

  public unsubscribe(): void {
    this.controls.forEach((control) => control.unsubscribe());
  }
}
