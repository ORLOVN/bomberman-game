import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Button, Divider, Flex, Icon } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";
import { BiPalette } from "react-icons/bi";

import Navbar from "@/components/Navbar/Navbar";

import { authApiService, themeApiService } from "@/store";
import { routes } from "./constants";
import { useAppSelector } from "@/hooks";

export default function UserLayout() {
  const user = useAppSelector((state) => state.auth.user);
  const theme = useAppSelector((state) => state.theme.theme);
  themeApiService.useGetUserThemeQuery(user.id);
  const [signOut] = authApiService.useSignOutMutation();
  const [switchTheme] = themeApiService.useSwitchThemeMutation();

  return (
    <Flex className={theme} direction="column" minHeight="100vh">
      <Flex w="100%" px="6" py="5" justify="center" pos="relative">
        <Navbar routes={routes} />
        <Box pos="absolute" top="3" right="20">
          <Button variant="ghost" onClick={() => switchTheme(user.id)}>
            <Icon w={6} h={6} as={BiPalette} />
          </Button>
        </Box>
        <Box pos="absolute" top="3" right="3">
          <Button variant="ghost" onClick={() => signOut()}>
            <Icon w={6} h={6} as={FaSignOutAlt} />
          </Button>
        </Box>
      </Flex>
      <Divider />
      <Flex flex="1" justify="center">
        <Outlet />
      </Flex>
    </Flex>
  );
}
