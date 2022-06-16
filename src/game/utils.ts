import { MutableRefObject, RefObject } from "react";
import {ICollidable} from '@/game/engine/collision/interfaces/ICollidable';

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

export function isCollidable(entity: unknown | ICollidable): entity is ICollidable {
  return (entity as ICollidable).getCollisionBox !== undefined;
}
