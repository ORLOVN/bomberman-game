import {ICollisionBox} from '@/game/engine/collision/interfaces/ICollisionBox';

export interface ICollidable {
  getCollisionBox(): ICollisionBox;
}
