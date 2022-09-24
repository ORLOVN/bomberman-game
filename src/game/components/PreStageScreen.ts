import { IEntity } from "@/game/engine/interfaces/IEntity";
import { entityManager } from "@/game/engine/EntityManager";
import { PictureLabel } from "@/game/components/PictureLabel";
import pictureLabels from "@/assets/images/sprites/pictureLabels.png";
import pictureFont from "@/assets/images/sprites/font.png";
import { loadImageFromUrl } from "@/game/utils";
import { PictureText } from "@/game/components/PictureText";
import { KeyListener } from "@/game/engine/KeyListener";
import { IControl } from "@/game/engine/interfaces/IControl";

export class PreStageScreen implements IEntity {
  public readonly id = Symbol("id");
  public width = 1536;
  public height = 786;
  private context: CanvasRenderingContext2D;

  private readyLabel: PictureLabel;
  private stageLabel: PictureLabel;
  private stageNumberLabel: PictureText;
  private stageNumber: number;

  private controls: Array<IControl> = [];

  private delay = 3;

  constructor(context: CanvasRenderingContext2D, stageNumber: number) {
    this.stageNumber = stageNumber;
    this.context = context;

    const scale = 0.5;

    this.readyLabel = new PictureLabel(400, 100, scale, this.context);

    this.stageLabel = new PictureLabel(450, 400, scale, this.context);

    this.stageNumberLabel = new PictureText(
      950,
      430,
      this.stageNumber.toString(),
      130,
      this.context
    );
    this.controls.push(this.readyLabel, this.stageLabel, this.stageNumberLabel);
  }

  private onDelayExpires() {}

  public addOnDelayExpires(onDelayExpiresHandler: () => void): PreStageScreen {
    this.onDelayExpires = onDelayExpiresHandler;
    return this;
  }

  public async setup(): Promise<void> {
    const fontSprite = await loadImageFromUrl(pictureFont);
    const labelSprite = await loadImageFromUrl(pictureLabels);

    this.readyLabel.setResources({
      spriteImage: labelSprite,
      x: 42,
      y: 1500,
      width: 1761,
      height: 432,
    });

    this.stageLabel.setResources({
      spriteImage: labelSprite,
      x: 117,
      y: 54,
      width: 909,
      height: 336,
    });

    this.stageNumberLabel.setResources({
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
    context.fillStyle = "#89d0ee";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    this.controls.forEach((control) => control.render(delta));

    this.delay -= delta;
    if (this.delay < 0) {
      this.onDelayExpires();
    }
  }

  public die(): void {
    entityManager.removeEntity(this.id);
  }

  public unsubscribe() {
    this.controls.forEach((control) => control.unsubscribe?.());
  }
}
