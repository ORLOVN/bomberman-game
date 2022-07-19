export interface IControl {
  render(delta: number): void;
  unsubscribe(): void;
}
