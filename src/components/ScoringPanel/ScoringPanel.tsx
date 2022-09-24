import React from "react";

import { Center, Flex, Text } from "@chakra-ui/react";

import styles from "./ScoringPanel.module.scss";
import { useAppSelector } from "@/hooks";

export default function ScoringPanel() {
  const leftLives = useAppSelector((store) => store.game.leftLives);
  const score = useAppSelector((store) => store.game.score);
  const leftTimeSecond = useAppSelector((store) => store.game.leftTimeSecond);

  return (
    <Flex className={styles.panel}>
      <Center flex="1">
        <Text className="panel__text">
          <strong>TIME</strong> {leftTimeSecond}
        </Text>
      </Center>
      <Center flex="1">
        <Text className="panel__text">
          <strong>SCORE</strong> {score}
        </Text>
      </Center>
      <Center flex="1">
        <Text className="panel__text">
          <strong>LEFT</strong> {leftLives}
        </Text>
      </Center>
    </Flex>
  );
}
