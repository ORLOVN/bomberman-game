import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useStore } from "react-redux";
import { isRefCurrent } from "@/game/utils";
import { Game } from "@/game/components/Game";
import styles from "./GameBootstrap.module.scss";
import { NotificationService } from "@/components/ErrorHandler";
import { useAppSelector } from "@/hooks";
import ScoringPanel from "@/components/ScoringPanel/ScoringPanel";
import createStore from "@/store";

export default function GameBootstrap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isGamePanelShown = useAppSelector((store) => store.game.showPanel);
  const store: ReturnType<typeof createStore> = useStore();

  useEffect(() => {
    if (!isRefCurrent(canvasRef)) {
      throw new Error("Couldn't find a reference to the canvas element");
    }

    canvasRef.current.focus();

    const game = new Game(canvasRef, store);

    game.runInitialScreen();

    NotificationService.notifyInfo(
      "Press the 'q' key to open fullscreen mode",
      {
        dismiss: {
          duration: 0,
          showIcon: true,
        },
        onRemoval: () => canvasRef?.current?.focus(),
      }
    );

    return () => {
      game.unsubscribe();
      NotificationService.removeAllNotifications();
    };
  }, []);

  return (
    <Box>
      {isGamePanelShown && <ScoringPanel />}
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
