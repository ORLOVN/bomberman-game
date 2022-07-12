import { IEntity } from "@/game/engine/interfaces/IEntity";
import { KeyListener } from "@/game/engine/KeyListener";

class EntityManager {
  private entities: IEntity[] = [];

  public addEntity(entity: IEntity): void {
    this.entities.push(entity);
  }

  public getEntities(): IEntity[] {
    return this.entities;
  }

  public async setupEntities(): Promise<void[]> {
    const promises = this.getEntities().map((e) => e.setup());
    return Promise.all(promises);
  }

  public removeEntity(id: Symbol): void {
    this.entities = this.entities.filter((entity) => entity.id !== id);
  }

  public renderEntities(
    context: CanvasRenderingContext2D,
    keyListener: KeyListener,
    delta: number
  ): void {
    this.getEntities().forEach((e) => e.render(context, keyListener, delta));
  }

  public clear(): void {
    this.entities.forEach((entity) => {
      entity.unsubscribe?.();
    });
    this.entities = [];
  }
}

export const entityManager = new EntityManager();
