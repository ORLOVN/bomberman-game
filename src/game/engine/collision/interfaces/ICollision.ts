import {ICollidable} from '@/game/engine/collision/interfaces/ICollidable';

export interface ICollision {
  width: ICollidable;
  top: boolean;
  bottom: boolean;
  right: boolean;
  left: boolean;
}
