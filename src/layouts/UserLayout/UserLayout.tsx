import React from "react";
import {Box, Button, Divider, Flex, Icon} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {FaSignOutAlt} from "react-icons/fa";
import {useAuth} from "@/hooks";
import Navbar from "@/components/Navbar/Navbar";
import {Route} from "@/types";
import {RoutePaths} from "@/enums";

const routes: Route[] = [
  {
    name: "Home",
    path: `${RoutePaths.home}`,
  },
  {
    name: "Game",
    path: `/${RoutePaths.game}`,
  },
  {
    name: "Profile",
    path: `/${RoutePaths.profile}`,
  },
  {
    name: "Forum",
    path: `/${RoutePaths.forum}`,
  },
];

export default function UserLayout() {
  const { logout } = useAuth();

  return (
    <Flex direction="column" minHeight="100vh">
      <Flex w="100%" px="6" py="5" justify="center" pos="relative">
        <Navbar routes={routes} />
        <Box pos="absolute" top="3" right="3">
          <Button variant="ghost" onClick={logout}>
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
