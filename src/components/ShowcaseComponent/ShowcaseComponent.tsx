import React, { useState } from "react";
import { Box, Button, Heading, Icon, Image, Stack } from "@chakra-ui/react";
import { FaReact } from "react-icons/fa";
import url from "@/assets/images/test.jpg";
import styles from "./ShowcaseComponent.module.scss";
import { notificationService } from "@/components/ErrorHandler";

export default function ShowcaseComponent() {
  const initialState = { error: { message: "" } };
  const [state, setState] = useState(initialState);

  const throwErrorHandler = () => {
    try {
      throw new Error("Something has just happened because of ...");
    } catch (error: unknown) {
      notificationService.notifyError(
        error instanceof Error ? error.message : String(error)
      );
    }
  };

  const throwErrorRender = () => {
    // @ts-ignore
    setState(() => ({ error: null }));
  };

  return (
    <Box pt="5">
      <Box className={styles.title}>
        <Icon mr="2" color="#1787f5" as={FaReact} />
        <Heading as="h1" size="md" noOfLines={1}>
          Showcase Component
          {state.error.message}
        </Heading>
      </Box>
      <Image className={styles.img} src={url} alt="Картинка" />
      <Stack direction="row" spacing={6} justifyContent="center">
        <Button colorScheme="red" variant="solid" onClick={throwErrorRender}>
          Throw an error ⚡ in the render function
        </Button>
        <Button colorScheme="red" variant="outline" onClick={throwErrorHandler}>
          Throw an error ⚡ in the event handler
        </Button>
      </Stack>
    </Box>
  );
}
