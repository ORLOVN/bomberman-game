import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import { developmentOptions } from "@/game/constants/gameConstants";
import { Collidable } from "@/game/engine/collision";
import { ICollision } from "@/game/engine/collision/interfaces/ICollision";
import { opositeCollision } from "@/game/utils";

const compareWalls = (
  rl: number, // relevant collidable left edge
  rr: number,
  ru: number,
  rb: number,

  cl: number,
  cr: number,
  cu: number,
  cb: number // current collidable button edge
) => ({
  rCol: cl < rl && cr > rl, // right collision
  hIn: cl <= rl && cr >= rr, // horizontally in
  lCol: rl < cl && rr > cl, // left collision
  tCol: ru < cb && rb > cb, // top collision
  vIn: cu <= ru && cb >= rb, // vertically in
  bCol: ru < cu && rb > cu, // bottom collision
});

export class CollisionHandler {
  private collidables: Collidable[] = [];
  private context: CanvasRenderingContext2D | undefined;

  public addCollidable(collidable: Collidable): void {
    this.collidables.push(collidable);
  }

  public removeCollidable(collidable: Collidable): void {
    this.collidables = this.collidables.filter((item) => collidable !== item);
  }

  public findCollisions(currentCollidable: Collidable) {
    const collidedList: Array<Collidable> = [];
    const prevCollidedList = currentCollidable.collidedList;
    this.collidables.forEach((relevantEntity) => {
      if (relevantEntity !== currentCollidable) {
        const { metCollidable, collision } = this.findCollision(
          currentCollidable,
          relevantEntity
        );

        if (metCollidable) {
          currentCollidable.collisionDetected(metCollidable, collision);
          metCollidable.collisionDetected(
            currentCollidable,
            opositeCollision(collision)
          );

          collidedList.push(metCollidable);
          const foundIndex = prevCollidedList.findIndex(
            (item) => item === metCollidable
          );
          if (foundIndex >= 0) {
            prevCollidedList.splice(foundIndex, 1);
          } else {
            currentCollidable.collisionStarted(metCollidable, collision);
            metCollidable.collisionStarted(
              currentCollidable,
              opositeCollision(collision)
            );
          }
        }
      }
    });
    prevCollidedList.forEach((collidable) => {
      collidable.collisionLeaved?.(currentCollidable);
      currentCollidable.collisionLeaved(collidable);
    });

    currentCollidable.collidedList = collidedList;
  }

  public clear(): void {
    this.collidables = [];
  }
  private drawCollisionBox(
    ctx: CanvasRenderingContext2D,
    { xPos, yPos, width, height }: ICollisionGeometry,
    color: string = "blue"
  ) {
    ctx.save();
    ctx.translate(xPos, yPos);
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.rect(-width / 2, -height / 2, width, height);
    ctx.globalAlpha = 0.3;
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  public render(context: CanvasRenderingContext2D) {
    if (!developmentOptions.showCollisionEntities) return;
    this.collidables.forEach((collidable) => {
      this.drawCollisionBox(context, collidable.getGeometry());
    });
    this.context = context;
  }

  private findCollision(
    currentEntity: Collidable,
    relevantEntity: Collidable
  ): { metCollidable: Collidable | null; collision: ICollision } {
    const currentGeometry = currentEntity.getGeometry();
    const relevantGeometry = relevantEntity.getGeometry();

    if (
      developmentOptions.showCollisionEntities &&
      currentEntity.type === "probe" &&
      this.context
    ) {
      this.drawCollisionBox(this.context, currentGeometry, "red");
    }

    const rl = relevantGeometry.xPos - relevantGeometry.width / 2; // relevant collidable left edge
    const rr = relevantGeometry.xPos + relevantGeometry.width / 2;
    const ru = relevantGeometry.yPos - relevantGeometry.height / 2;
    const rb = relevantGeometry.yPos + relevantGeometry.height / 2; // relevant collidable bottom edge

    let cl =
      currentGeometry.xPos + currentGeometry.xVel - currentGeometry.width / 2; // current collidable left edge
    let cr =
      currentGeometry.xPos + currentGeometry.xVel + currentGeometry.width / 2;
    let cu = currentGeometry.yPos - currentGeometry.height / 2;
    let cb = currentGeometry.yPos + currentGeometry.height / 2;

    let col = compareWalls(
      // collisions
      rl,
      rr,
      ru,
      rb,

      cl,
      cr,
      cu,
      cb
    );

    const lOff = col.rCol ? cr - rl : Infinity; // leftOffset
    const rOff = col.lCol ? rr - cl : Infinity;

    let xOff = 0; // x offset
    if ((col.rCol || col.lCol) && (col.tCol || col.bCol)) {
      xOff = Math.abs(lOff) < Math.abs(rOff) ? -lOff : rOff;
      xOff = xOff * currentGeometry.xVel <= 0 ? xOff : 0;
    }

    cl = currentGeometry.xPos - currentGeometry.width / 2;
    cr = currentGeometry.xPos + currentGeometry.width / 2;
    cu =
      currentGeometry.yPos + currentGeometry.yVel - currentGeometry.height / 2;
    cb =
      currentGeometry.yPos + currentGeometry.yVel + currentGeometry.height / 2;

    col = compareWalls(
      rl,
      rr,
      ru,
      rb,

      cl,
      cr,
      cu,
      cb
    );

    const tOff = col.tCol ? cb - ru : Infinity;
    const bOff = col.bCol ? rb - cu : Infinity;

    let yOff = 0;
    if ((col.rCol || col.lCol) && (col.tCol || col.bCol)) {
      yOff = Math.abs(tOff) < Math.abs(bOff) ? -tOff : bOff;
      yOff = yOff * currentGeometry.yVel <= 0 ? yOff : 0;
    }

    if (
      xOff !== 0 ||
      yOff !== 0 ||
      ((col.rCol || col.hIn || col.lCol) && (col.tCol || col.vIn || col.bCol))
    ) {
      return {
        metCollidable: relevantEntity,
        collision: {
          xOffset: xOff,
          yOffset: yOff,
        },
      };
    }

    return {
      metCollidable: null,
      collision: {
        xOffset: 0,
        yOffset: 0,
      },
    };
  }
}

export const collisionHandler = new CollisionHandler();
