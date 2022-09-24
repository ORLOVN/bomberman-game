import { KeyListener } from "@/game/engine/KeyListener";
import EntityTypes from "@/game/engine/enums/EntityTypes";

export interface IEntity {
  readonly id: Symbol;
  readonly type?: string;
  setup(): Promise<void>;
  render(
    context: CanvasRenderingContext2D,
    keyListener: KeyListener,
    delta: number
  ): void;
  die(): void;
  unsubscribe?: () => void;
}

export interface IEntityWithType extends IEntity {
  type: EntityTypes;
}
