import { Brick } from "@/game/components/Brick";
import { IEntity } from "@/game/engine/interfaces/IEntity";

class BrickManager {
  public addCurbBricks(
    mapWidth: number,
    mapHeight: number,
    addEntity: (entity: IEntity) => void
  ): void {
    const tileSize = 64;
    const tileCountX = Math.ceil(mapWidth / tileSize);
    const tileCountY = Math.ceil(mapHeight / tileSize);

    for (let y = 0; y < tileCountY; y += 1) {
      for (let x = 0; x < tileCountX; x += 1) {
        if (
          y === 0 ||
          y === tileCountY - 1 ||
          x === 0 ||
          x === tileCountX - 1
        ) {
          addEntity(
            new Brick(tileSize / 2 + x * tileSize, tileSize / 2 + y * tileSize)
          );
        }
      }
    }
  }
}

export const brickManager = new BrickManager();
