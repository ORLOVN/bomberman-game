import React from "react";

import { HStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import styles from "./Navbar.module.scss";
import { IProps } from "./types";

export default function Navbar({ routes }: IProps) {
  return (
    <HStack as="nav" spacing="5">
      {routes.map(({ path, name }) => (
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
