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

  public isAnyKeyPressed(keys: string[]): boolean {
    return keys.some((key) => Boolean(this.keyStates[key]));
  }

  public unsubscribe(): void {
    this.node.removeEventListener("keydown", this.setKey.bind(this));
    this.node.removeEventListener("keyup", this.resetKey.bind(this));
    this.keyStates = {};
  }

  public resetKeysManually(keyNames: string[]): void {
    keyNames.forEach((keyName) => {
      this.keyStates[keyName] = false;
    })
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
