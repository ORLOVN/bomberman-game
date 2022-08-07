import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import leaderBoardApiService from "@/store/apiServices/leaderboard";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setNext } from "@/store/slices/";

export default function Leaderboard() {
  const dispatch = useAppDispatch();

  const { activeNext, cursorPosition, step, leaderList } = useAppSelector(
    (state) => state.leaderBoard
  );
  const { isLoading } = leaderBoardApiService.useGetScoreEntriesQuery({
    ratingFieldName: "score",
    cursor: cursorPosition,
    limit: step,
  });

  const nextClickHandle = () => {
    dispatch(setNext());
  };

  const getMoreButton = !activeNext ? (
    ""
  ) : (
    <Flex justify="center">
      <Button
        isLoading={isLoading}
        disabled={isLoading || !activeNext}
        loadingText="Getting..."
        onClick={() => {
          nextClickHandle();
        }}
      >
        Get more
      </Button>
    </Flex>
  );

  return (
    <Box mt={4} w={1000} px="6" py="5">
      <Heading as="h2" size="lg" mb={8}>
        Leaderboard
      </Heading>
      <Table>
        <Tbody>
          {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
          {leaderList?.map((data, index) => (
            <Tr key={data.id}>
              <Td w="2%">
                <Avatar
                  src={`${process.env.HOST}/resources${data.avatar}`}
                  name={data.name}
                />
              </Td>
              <Td>
                <Flex pb={1}>
                  <Text fontWeight="bold">{`${index + 1}.`}</Text>
                  <Text ml={1}>{data.name}</Text>
                </Flex>
                <Box>
                  <Progress value={(data.score / leaderList[0].score) * 100} />
                </Box>
              </Td>
              <Td width="10%" align="right">
                {`${data.score} points`}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {getMoreButton}
    </Box>
  );
}
