import { IControl } from "@/game/engine/interfaces/IControl";

type Resources =
  | {
      spriteImage: HTMLImageElement;
      columns: number;
      rows: number;
      width: number;
      height: number;
      symbolPattern: string;
    }
  | undefined;

type Point = {
  x: number;
  y: number;
};

export class PictureText implements IControl {
  public readonly id = Symbol("id");
  private xPos: number;
  private yPos: number;
  private text: string;
  private size: number;
  private symbolHeight: number = 0;
  private symbolWidth: number = 0;
  private ratio: number = 1;
  private context: CanvasRenderingContext2D;
  private sprite?: HTMLImageElement;
  private symbolMap: Record<string, Point> = {};

  constructor(
    xPos: number,
    yPos: number,
    text: string,
    size: number,
    context: CanvasRenderingContext2D
  ) {
    this.text = text;

    this.xPos = xPos;
    this.yPos = yPos;
    this.context = context;

    this.size = size;
  }

  setResources(resources: Resources) {
    if (!resources) return;

    this.sprite = resources.spriteImage;
    this.symbolWidth = resources.width;
    this.symbolHeight = resources.height;

    this.symbolMap = {};

    let columnPos = 0;
    let rowPos = 0;

    for (let i = 0; i < resources.symbolPattern.length; i++) {
      this.symbolMap[resources.symbolPattern[i]] = {
        x: columnPos * resources.width,
        y: rowPos * resources.height,
      };
      columnPos++;
      if (columnPos >= resources.columns) {
        columnPos = 0;
        rowPos++;
      }

      if (rowPos >= resources.rows) {
        break;
      }
    }

    this.ratio = resources.width / resources.height;
  }

  public async setup(): Promise<void> {}

  public render(): void {
    const ctx = this.context;

    if (this.sprite) {
      const width = this.size * this.ratio;
      const offset = -30 * this.ratio;
      let caretPos = 0;

      ctx.save();

      for (let i = 0; i < this.text.length; i++) {
        ctx.drawImage(
          this.sprite!,
          this.symbolMap[this.text[i]].x,
          this.symbolMap[this.text[i]].y,
          this.symbolWidth,
          this.symbolHeight,
          this.xPos + caretPos,
          this.yPos,
          width,
          this.size
        );
        caretPos += width + offset;
      }

      ctx.restore();
    }
  }
}
