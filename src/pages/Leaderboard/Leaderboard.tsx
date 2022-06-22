import { Avatar, Box, Flex, Heading, Progress, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import React, { useRef } from "react";
import { mock } from "./constants";

export default function Leaderboard() {
  const maxValue = useRef(mock[0].score);

  return (
    <Box mt={4} w={1000} px="6" py="5">
      <Heading as='h2' size='lg' mb={8}>
        Leaderboard
      </Heading>
      <Table>
        <Tbody>
          {mock.map(({id, avatar, nickname, position, score}) => (
              <Tr key={id}>
                <Td w="2%">
                  <Avatar src={avatar} name={nickname} />
                </Td>
                <Td>
                  <Flex pb={1}>
                    <Text fontWeight="bold">
                      {`${position}.`}
                    </Text>
                    <Text ml={1}>{nickname}</Text>
                  </Flex>
                  <Box>
                    <Progress value={(score / maxValue.current) * 100 } />
                  </Box>
                </Td>
                <Td width="10%" align="right">
                  {`${score} points`}
                </Td>
              </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
