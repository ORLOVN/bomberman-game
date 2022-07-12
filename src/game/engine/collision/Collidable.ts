import { IEntity } from "@/game/engine/interfaces/IEntity";
import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import EntityTypes from "@/game/engine/enums/EntityTypes";
import { ICollision } from "@/game/engine/collision/interfaces/ICollision";
import { collisionHandler } from "@/game/engine/collision/CollisionHandler";

export class Collidable {
  public readonly id = Symbol("id");
  public readonly owner: IEntity;
  public readonly type: EntityTypes;
  public collidedList: Array<Collidable> = [];

  public getGeometry: () => ICollisionGeometry = () => ({
    xPos: 0,
    yPos: 0,
    xVel: 0,
    yVel: 0,
    width: 0,
    height: 0,
  });

  constructor(owner: IEntity, type: EntityTypes) {
    this.owner = owner;
    this.type = type;
    if (type !== EntityTypes.probe) {
      collisionHandler.addCollidable(this);
    }
  }

  public remove() {
    if (this.type !== EntityTypes.probe) {
      collisionHandler.removeCollidable(this);
    }
  }

  public addGetGeometry(getGeometryFunction: () => ICollisionGeometry) {
    this.getGeometry = getGeometryFunction;
    return this;
  }

  public addCollisionDetected(
    collisionDetectedFunction: (
      collisionWith: Collidable,
      collision: ICollision
    ) => void
  ) {
    this.collisionDetected = collisionDetectedFunction;
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public collisionDetected(collisionWith: Collidable, collision: ICollision) {}

  public addCollisionStarted(
    collisionStartedFunction: (
      collisionWith: Collidable,
      collision: ICollision
    ) => void
  ) {
    this.collisionStarted = collisionStartedFunction;
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public collisionStarted(collisionWith: Collidable, collision: ICollision) {}

  public addCollisionLeaved(
    collisionLeavedFunction: (collisionWith: Collidable) => void
  ) {
    this.collisionLeaved = collisionLeavedFunction;
    return this;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public collisionLeaved(collisionWith: Collidable) {}

  public checkCollisions() {
    collisionHandler.findCollisions(this);
  }
}
