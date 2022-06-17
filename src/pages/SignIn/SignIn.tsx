import React from "react";
import { Button, Flex } from "@chakra-ui/react";

export default function SignIn() {

  return (
    <Flex align="center" direction="column">
      <div>SignIn</div>
      <Button w={200} variant="outline">
        Login
      </Button>
    </Flex>
  );
}
