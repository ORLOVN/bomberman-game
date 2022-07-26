import {IEntity, IEntityWithType} from "@/game/engine/interfaces/IEntity";
import EntityTypes from '@/game/engine/enums/EntityTypes';
import { KeyListener } from "@/game/engine/KeyListener";

class EntityManager {
  private entities: IEntity[] = [];

  public addEntity(entity: IEntity): void {
    this.entities.push(entity);
  }

  public getEntities(): IEntity[] {
    return this.entities;
  }

  public getEntityByType(type: EntityTypes): IEntity | undefined {
    return this.entities.find(entity => (entity as IEntityWithType).type === type);
  }

  public setupEntities(): Promise<void[]> {
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
