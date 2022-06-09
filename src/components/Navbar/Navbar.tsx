import React from "react";

import { HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import { Route } from "@/types";

import styles from "./Navbar.module.scss";

export default function Navbar({ routes }: { routes: Route[] }) {
  return (
    <HStack as="nav" spacing="5">
      {routes.map(({path, name}) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            isActive ? `${styles["nav-link_active"]}` : ""
          }
        >
          {name}
        </NavLink>
      ))}
    </HStack>
  );
}
