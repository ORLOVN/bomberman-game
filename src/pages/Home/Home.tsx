import { Flex } from "@chakra-ui/react";
import React from "react";

import styles from "./Home.module.scss";

export default function Home() {
  return (
    <Flex
      align="center"
      direction="column"
      px="6"
      py="5"
      className={styles.wallpaper}
    />
  );
}
