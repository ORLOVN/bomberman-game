import {KeyListener} from '@/game/engine/KeyListener';

export interface IEntity {
  readonly id: Symbol;
  setup(): Promise<void>;
  render(context: CanvasRenderingContext2D, keyListener: KeyListener, delta: number): void;
  die(): void;
}
