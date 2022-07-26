export interface IControl {
  render(delta: number): void;
  setup(): Promise<void>;
  unsubscribe?: () => void;
}
