class EventBus {
  private listeners = {} as Record<string, Function[]>;

  on(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Function): void {
    if (!this.listeners[event]) {
      throw new Error(`There is no such event: ${event}!`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: Function) => listener !== callback
    );
  }

  emit(event: string, ...args: any): Error | void {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener: Function) => listener(...args));
    }
  }

  reset(event: string) {
    this.listeners[event] = [];
  }
}
const eventBus = new EventBus();

export default eventBus;
