import {Bomb} from '@/game/components/Bomb';
import {entityManager} from '@/game/engine/EntityManager';

class BombManager {
  private bombs: Bomb[] = [];

  public addBomb(xPos: number, yPos: number): void {
    const bomb = new Bomb(xPos, yPos);

    bomb.setup().then(() => {
      this.bombs.push(bomb);
      entityManager.addEntity(bomb);
    });

    bomb.afterRemoval(() => {
      this.bombs = this.bombs.filter((b) => b.id !== bomb.id);
    });
  }

  public get bombCount(): number {
    return this.bombs.length;
  }

  public clear(): void {
    this.bombs = [];
  }
}

export const bombManager = new BombManager();
