import { ICollisionBox } from "@/game/engine/collision/interfaces/ICollisionBox";
import { ICollidable } from "@/game/engine/collision/interfaces/ICollidable";
import { ICollision } from "@/game/engine/collision/interfaces/ICollision";

export class CollisionHandler {
  private collidables: ICollidable[] = [];

  public addCollidable(collidable: ICollidable): void {
    this.collidables.push(collidable);
  }

  public findCollisions(
    driverBox: ICollisionBox,
    xMovement: number,
    yMovement: number
  ): ICollision[] {
    const collisions: ICollision[] = [];

    this.collidables.forEach((collidable) => {
      const collision = this.findCollision(
        {
          xPos: driverBox.xPos + xMovement,
          yPos: driverBox.yPos + yMovement,
          width: driverBox.width,
          height: driverBox.height,
        },
        collidable
      );

      if (collision != null) {
        collisions.push(collision);
      }
    });

    return collisions;
  }

  public clear(): void {
    this.collidables = [];
  }

  private findCollision(driverBox: ICollisionBox, brick: ICollidable): ICollision | null {
    const brickBox = brick.getCollisionBox();

    const rightCollision =
      driverBox.xPos < brickBox.xPos &&
      driverBox.xPos + driverBox.width > brickBox.xPos;
    const leftCollision =
      brickBox.xPos < driverBox.xPos &&
      brickBox.xPos + brickBox.width > driverBox.xPos;
    const topCollision =
      driverBox.yPos < brickBox.yPos &&
      driverBox.yPos + driverBox.height > brickBox.yPos;
    const bottomCollision =
      brickBox.yPos < driverBox.yPos &&
      brickBox.yPos + brickBox.height > driverBox.yPos;

    if (
      (rightCollision || leftCollision) &&
      (topCollision || bottomCollision)
    ) {
      return {
        width: brick,
        top: topCollision,
        bottom: bottomCollision,
        right: rightCollision,
        left: leftCollision,
      };
    }

    return null;
  }
}

export const collisionHandler = new CollisionHandler();
