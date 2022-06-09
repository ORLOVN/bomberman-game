import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useAuth } from "@/hooks";

export default function SignIn() {
  const { login } = useAuth();

  return (
    <Flex align="center" direction="column">
      <div>SignIn</div>
      <Button w={200} variant="outline" onClick={login}>
        Login
      </Button>
    </Flex>
  );
}
