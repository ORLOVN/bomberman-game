import React from "react";
import { Divider, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";

import { routes } from "./constants";


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
