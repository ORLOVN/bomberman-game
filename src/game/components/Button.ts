import { IControl } from "@/game/engine/interfaces/IControl";

type Position = {
  x: number;
  y: number;
};

type Rectangle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class Button implements IControl {
  public readonly id = Symbol("id");
  private geometry: Rectangle;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private padding: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  private text: string;

  private mouseIn: boolean = false;

  constructor(
    text: string,
    x: number,
    y: number,
    context: CanvasRenderingContext2D
  ) {
    this.geometry = {
      x,
      y,
      width: 0,
      height: 0,
    };

    this.padding = {
      left: 10,
      top: 10,
      right: 10,
      bottom: 10,
    };

    this.text = text;
    this.context = context;
    this.canvas = context.canvas;

    this.canvas.addEventListener("click", this.ButtonClickHandler);
    this.canvas.addEventListener("mousemove", this.ButtonHoverHandler);
  }

  private ButtonClickHandler = (event: MouseEvent) => {
    const mousePos = this.getMousePos(this.canvas, event);
    if (this.isInside(mousePos, this.geometry)) {
      this.onClick();
    }
  };

  private ButtonHoverHandler = (event: MouseEvent) => {
    const mousePos = this.getMousePos(this.canvas, event);

    if (this.isInside(mousePos, this.geometry)) {
      if (!this.mouseIn) {
        this.onMouseIn();
        this.mouseIn = true;
      }
      this.onHover();
    } else if (this.mouseIn) {
      this.onMouseOut();
      this.mouseIn = false;
    }
  };

  public unsubscribe() {
    this.canvas.removeEventListener("click", this.ButtonClickHandler);
    this.canvas.removeEventListener("mousemove", this.ButtonHoverHandler);
  }

  public onClick() {}
  public onHover() {}
  public onMouseOut() {}
  public onMouseIn() {}

  public async setup(): Promise<void> {}

  private getMousePos(canvas: HTMLCanvasElement, event: MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * this.canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * this.canvas.height,
    };
  }

  private isInside(position: Position, rect: Rectangle) {
    return (
      position.x > rect.x &&
      position.x < rect.x + rect.width &&
      position.y < rect.y + rect.height &&
      position.y > rect.y
    );
  }

  public render(): void {
    const hover = this.mouseIn;

    const ctx = this.context;

    ctx.save();

    ctx.font = "40px Lucida Console Semi-Condensed";

    const textMetrics = ctx.measureText(this.text);

    this.geometry.width =
      this.padding.left + textMetrics.width + this.padding.right;
    this.geometry.height =
      this.padding.top +
      textMetrics.actualBoundingBoxAscent +
      textMetrics.actualBoundingBoxDescent +
      this.padding.bottom;

    const textX = this.geometry.x + this.padding.left;
    const textY =
      this.geometry.y +
      this.geometry.height -
      this.padding.bottom -
      textMetrics.actualBoundingBoxDescent;

    ctx.beginPath();
    ctx.rect(
      this.geometry.x,
      this.geometry.y,
      this.geometry.width,
      this.geometry.height
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();

    ctx.fillStyle = hover ? "rgba(225,0,0,0.5)" : "rgba(225,225,225,0.5)";
    ctx.fillRect(
      this.geometry.x,
      this.geometry.y,
      this.geometry.width,
      this.geometry.height
    );

    ctx.fillStyle = "#000000";
    ctx.fillText(this.text, textX, textY);
    ctx.restore();
  }
}
