import {
  Box,
  Button,
  Flex,

} from "@chakra-ui/react";
import React from "react";

export default function Error404() {


  return (
    <Box mt={4} w={1000} px="6" py="5">
      <Flex justify="center">
        Error 404. Page is not found
        <Button
          onClick={() => {
            //
          }}
        >
          Go Back
        </Button>
      </Flex>
    </Box>
  );
}
