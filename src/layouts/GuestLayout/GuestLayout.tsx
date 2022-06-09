import React from "react";
import { Divider, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import { Route } from "@/types";
import { RoutePaths } from "@/enums";

const routes: Route[] = [
  {
    name: "Sign In",
    path: `/${RoutePaths.signIn}`,
  },
  {
    name: "Sign Up",
    path: `/${RoutePaths.signUp}`,
  },
];

export default function GuestLayout() {
  return (
    <>
      <Flex w="100%" px="6" py="5" justify="center">
        <Navbar routes={routes} />
      </Flex>
      <Divider />
      <Flex w="100%" px="6" py="5" justify="center">
        <Outlet />
      </Flex>
    </>
  );
}
