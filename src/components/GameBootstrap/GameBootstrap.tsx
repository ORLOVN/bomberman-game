import React, { useEffect, useRef } from "react";
import {Box} from '@chakra-ui/react';
import { isRefCurrent } from "@/game/utils";
import { Game } from "@/game/components/Game";
import styles from "./GameBootstrap.module.scss";

export default function GameBootstrap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!isRefCurrent(canvasRef)) {
      throw new Error("Couldn't find a reference to the canvas element");
    }

    canvasRef.current.focus();

    const game = new Game(canvasRef);

    game.run();

    return () => {
      game.unsubscribe();
    };
  }, []);

  return (
    <Box>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width="1536px"
        height="768px"
        tabIndex={0}
      />
    </Box>
  );
}
