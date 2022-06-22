import { isCollidable } from "@/game/utils";
import { Brick } from "@/game/components/Brick";
import { ExplodingBlock } from "@/game/components/ExplodingBlock";
import { CreepEnemy } from "@/game/components/CreepEnemy";
import { IEntity } from "@/game/engine/interfaces/IEntity";
import { entityManager } from "@/game/engine/EntityManager";
import { collisionHandler } from "@/game/engine/collision/CollisionHandler";
import { levelUrls } from "@/game/engine/LevelGenerator/constants";
import { LevelEntitiesEnum } from "@/game/engine/LevelGenerator/enums";
import { LevelEntityPositions } from "@/game/engine/LevelGenerator/types";

export class LevelGenerator {
  public static async generate(levelNumber: number, tileSize: number) {
    const level = await LevelGenerator.getLevelData(levelNumber);

    if (!level) {
      return;
    }

    const bricksPositions = level[LevelEntitiesEnum.bricks];
    const eBlocksPositions = level[LevelEntitiesEnum.eBlocks];
    const creepsPositions = level[LevelEntitiesEnum.creeps];

    LevelGenerator.addEntities(bricksPositions, Brick, tileSize);
    LevelGenerator.addEntities(eBlocksPositions, ExplodingBlock, tileSize);
    LevelGenerator.addEntities(creepsPositions, CreepEnemy, tileSize);
  }

  private static addEntities(
    entitiesPositions: LevelEntityPositions[],
    EntityClass: new (xPos: number, yPos: number) => IEntity,
    tileSize: number,
  ): void {
    if (!entitiesPositions) {
      return;
    }

    entitiesPositions.forEach((entityPositions) => {
      const entity = new EntityClass(
        (entityPositions.xPos - 1) * tileSize,
        (entityPositions.yPos - 1) * tileSize
      );
      entityManager.addEntity(entity);

      if (isCollidable(entity)) {
        collisionHandler.addCollidable(entity);
      }
    });
  }

  private static async getLevelData(
    levelNumber: number
  ): Promise<{ [key in LevelEntitiesEnum]: LevelEntityPositions[] } | null> {
    const levelPath = levelUrls[levelNumber];

    if (!levelPath) {
      // eslint-disable-next-line no-console
      console.error(`Level with number ${levelNumber} has not been found`);
      return Promise.resolve(null);
    }

    const levelUrl = (await import(`@/game/levels/${levelPath}`).then(
      (module) => module.default
    )) as string;

    return fetch(levelUrl).then((body) => body.json());
  }
}
