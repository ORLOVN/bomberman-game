import { ICollisionGeometry } from "@/game/engine/collision/interfaces/ICollisionGeometry";
import { ICollision } from "@/game/engine/collision/interfaces/ICollision";
import EntityTypes from "@/game/engine/enums/EntityTypes";

export interface ICollidable {
  readonly id: Symbol;
  getCollisionEntity(): ICollisionGeometry;
  type: EntityTypes;
  metWith: (metEntity: ICollidable, collision: ICollision) => void;
  left?: (metEntity: ICollidable) => void;
}
