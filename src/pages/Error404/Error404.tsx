import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Box py={100}>
      <Flex direction="column" align="center">
        <Text>Error 404. Page is not found</Text>
        <Button onClick={() => navigate("/")}>Go to home page</Button>
      </Flex>
    </Box>
  );
}
