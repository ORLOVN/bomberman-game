import React from "react";
import { Outlet } from "react-router-dom";

import { Box, Button, Divider, Flex, Icon } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";

import Navbar from "@/components/Navbar/Navbar";

import { authApiService } from "@/store";
import { routes } from "./constants";

export default function UserLayout() {

  const [signOut] = authApiService.useSignOutMutation();

  return (
    <Flex direction="column" minHeight="100vh">
      <Flex w="100%" px="6" py="5" justify="center" pos="relative">
        <Navbar routes={routes} />
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
