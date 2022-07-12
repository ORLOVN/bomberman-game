import { Flame, Bomb } from "@/game";
import { entityManager } from "./EntityManager";
import { Direction } from "@/game/types";

class EntityFactory {
  private bomb: Bomb;
  private flame: Flame;
  constructor() {
    this.bomb = new Bomb(0, 0);
    this.flame = new Flame(0, 0, "all", 0);
  }

  public async setup() {
    await this.bomb.setup();
    await this.flame.setup();
  }

  public produceBomb(xPos: number, yPos: number) {
    const bomb = new Bomb(xPos, yPos).reuseResources(
      this.bomb.shareResources()
    );
    entityManager.addEntity(bomb);
    return bomb;
  }

  public produceFlame(
    xPos: number,
    yPos: number,
    direction: Direction,
    propagation: number
  ) {
    const flame = new Flame(xPos, yPos, direction, propagation).reuseResources(
      this.flame.shareResources()
    );
    entityManager.addEntity(flame);
    return flame;
  }
}

export const entityFactory = new EntityFactory();
