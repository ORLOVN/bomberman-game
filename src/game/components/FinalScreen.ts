import { IEntity } from "@/game/engine/interfaces/IEntity";
import { Button } from "@/game/components/Button";
import { entityManager } from "@/game/engine/EntityManager";
import { PictureLabel } from "@/game/components/PictureLabel";
import pictureLabels from "@/assets/images/sprites/pictureLabels.png";
import pictureFont from "@/assets/images/sprites/font.png";
import { loadImageFromUrl } from "@/game/utils";
import { PictureText } from "@/game/components/PictureText";
import { IControl } from "@/game/engine/interfaces/IControl";
import { KeyListener } from "@/game/engine/KeyListener";

export class FinalScreen implements IEntity {
  public readonly id = Symbol("id");
  public width = 1536;
  public height = 786;
  private context: CanvasRenderingContext2D;

  private startButton: Button;
  private leaderBoard: Button;
  private theEndLabel: PictureLabel;
  private scoreLabel: PictureLabel;
  private scoreValue: PictureText;

  private controls: Array<IControl> = [];

  constructor(context: CanvasRenderingContext2D, score: number) {
    this.context = context;
    this.startButton = new Button("START AGAIN", 300, 650, this.context);
    this.startButton.onClick = () => {
      this.onStartAgain();
    };

    this.leaderBoard = new Button("LEADER BOARD", 800, 650, this.context);
    this.leaderBoard.onClick = () => {
      this.onLeaderboardClick();
    };

    const scale = 0.5;

    this.theEndLabel = new PictureLabel(100, 100, scale, this.context);

    this.scoreLabel = new PictureLabel(100, 400, scale, this.context);

    this.scoreValue = new PictureText(
      600,
      450,
      score.toString(),
      130,
      this.context
    );

    this.controls.push(
      this.startButton,
      this.leaderBoard,
      this.theEndLabel,
      this.scoreLabel,
      this.scoreValue
    );
  }

  private onStartAgain() {}

  public addOnStartAgainHandler(func: () => void): FinalScreen {
    this.onStartAgain = func;
    return this;
  }

  private onLeaderboardClick() {}

  public addOnLeaderboardClick(func: () => void): FinalScreen {
    this.onLeaderboardClick = func;
    return this;
  }

  public async setup(): Promise<void> {
    const fontSprite = await loadImageFromUrl(pictureFont);
    const labelSprite = await loadImageFromUrl(pictureLabels);

    this.theEndLabel.setResources({
      spriteImage: labelSprite,
      x: 66,
      y: 1020,
      width: 2838,
      height: 484,
    });

    this.scoreLabel.setResources({
      spriteImage: labelSprite,
      x: 1120,
      y: 30,
      width: 1008,
      height: 362,
    });

    this.scoreValue.setResources({
      spriteImage: fontSprite,
      columns: 10,
      rows: 1,
      width: 260,
      height: 320,
      symbolPattern: "0123456789",
    });
  }

  public render(
    context: CanvasRenderingContext2D,
    keyListener: KeyListener,
    delta: number
  ): void {
    context.fillStyle = "#32586E";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    this.controls.forEach((control) => control.render(delta));
  }

  public die(): void {
    entityManager.removeEntity(this.id);
  }

  public unsubscribe() {
    this.controls.forEach((control) => control.unsubscribe?.());
  }
}
