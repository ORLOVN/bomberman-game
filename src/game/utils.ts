import { MutableRefObject, RefObject } from "react";
import { ICollidable } from "@/game/engine/collision/interfaces/ICollidable";
import { ICollision } from "@/game/engine/collision/interfaces/ICollision";

export function loadImageFromUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = url;
  });
}

export function isRefCurrent(
  ref: RefObject<HTMLCanvasElement> | null
): ref is MutableRefObject<HTMLCanvasElement> {
  return Boolean(ref?.current);
}

export function isCanvasElement(
  ctx: CanvasRenderingContext2D | null | undefined
): ctx is CanvasRenderingContext2D {
  return Boolean(ctx?.canvas);
}

export function isCollidable(
  entity: unknown | ICollidable
): entity is ICollidable {
  return (entity as ICollidable).getCollisionEntity !== undefined;
}

export function calcTileCenter(
  tileSize: number,
  x: number,
  y: number
): { x: number; y: number } {
  return {
    x: x - (x % tileSize) + tileSize / 2,
    y: y - (y % tileSize) + tileSize / 2,
  };
}

export function opositeCollision(collision: ICollision) {
  return {
    xOffset: -collision.xOffset,
    yOffset: -collision.yOffset,
  };
}

export function doOnce(func: (...args: any) => void) {
  let done = false;
  return (...args: any) => {
    if (!done) {
      func(...args);
      done = true;
    }
  };
}
