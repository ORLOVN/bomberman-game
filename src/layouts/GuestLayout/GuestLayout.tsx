import React from "react";
import { Box, Button, Divider, Flex, Icon } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useStore } from "react-redux";
import { BiPalette } from "react-icons/bi";

import createStore from "@/store";
import { switchTheme } from "@/store/slices";
import { useAppSelector } from "@/hooks";
import Navbar from "@/components/Navbar/Navbar";
import { routes } from "./constants";

export default function GuestLayout() {
  const store: ReturnType<typeof createStore> = useStore();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <Box className={theme} minHeight="100vh">
      <Flex w="100%" px="6" py="5" justify="center">
        <Navbar routes={routes} />
        <Box pos="absolute" top="3" right="20">
          <Button variant="ghost" onClick={() => store.dispatch(switchTheme())}>
            <Icon w={6} h={6} as={BiPalette} />
          </Button>
        </Box>
      </Flex>
      <Divider />
      <Flex w="100%" px="6" py="5" justify="center">
        <Outlet />
      </Flex>
    </Box>
  );
}
