export class KeyListener {
  private keyStates: { [key: string]: boolean } = {};
  private node: HTMLElement;

  constructor(node: HTMLElement) {
    this.node = node;
  }

  public setup(): void {
    this.node.addEventListener("keydown", this.setKey.bind(this));
    this.node.addEventListener("keyup", this.resetKey.bind(this));
  }

  public get isKeyLeft(): boolean {
    return Boolean(this.keyStates["a"]) || Boolean(this.keyStates["ArrowLeft"]);
  }

  public get isKeyRight(): boolean {
    return Boolean(this.keyStates["d"]) || Boolean(this.keyStates["ArrowRight"]);
  }

  public get isKeyTop(): boolean {
    return Boolean(this.keyStates["w"]) || Boolean(this.keyStates["ArrowUp"]);
  }

  public get isKeyBottom(): boolean {
    return Boolean(this.keyStates["s"]) || Boolean(this.keyStates["ArrowDown"]);
  }

  public get isKeyEnter(): boolean {
    return Boolean(this.keyStates["Enter"]) || Boolean(this.keyStates["e"]);
  }

  public unsubscribe(): void {
    this.node.removeEventListener("keydown", this.setKey.bind(this));
    this.node.removeEventListener("keyup", this.resetKey.bind(this));
    this.keyStates = {};
  }

  public resetKeyManually(keyName: string): void {
    this.keyStates[keyName] = false;
  }

  private setKey(e: KeyboardEvent): void {
    e.preventDefault();
    this.keyStates[e.key] = true;
  }

  private resetKey(e: KeyboardEvent): void {
    e.preventDefault();
    this.keyStates[e.key] = false;
  }
}
