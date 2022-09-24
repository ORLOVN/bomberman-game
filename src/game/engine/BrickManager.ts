import { Brick } from "@/game/components/Brick";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { TILE_SIZE } from "@/game/constants/gameConstants";

class BrickManager {
  public addCurbBricks(
    mapWidth: number,
    mapHeight: number,
    addEntity: (entity: IEntity) => void
  ): void {
    const tileCountX = Math.ceil(mapWidth / TILE_SIZE);
    const tileCountY = Math.ceil(mapHeight / TILE_SIZE);

    for (let y = 0; y < tileCountY; y += 1) {
      for (let x = 0; x < tileCountX; x += 1) {
        if (
          y === 0 ||
          y === tileCountY - 1 ||
          x === 0 ||
          x === tileCountX - 1
        ) {
          addEntity(
            new Brick(
              TILE_SIZE / 2 + x * TILE_SIZE,
              TILE_SIZE / 2 + y * TILE_SIZE
            )
          );
        }
      }
    }
  }
}

export const brickManager = new BrickManager();
