import { forumApiService } from "@/store";
import { Box, Button, Heading, List, Flex, CircularProgress } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import TopicPreview from "./components/TopicPreview";

export default function Forum() {
  const navigate = useNavigate();

  const {data: topicList, isFetching} = forumApiService.useGetTopicsQuery();

  const goToTopic = (id: string) => navigate(`/forum/topic/${id}`);

  return (
    <Box mt={4} w={1000} px="6" py="5">
      <Flex mb={8} justifyContent="space-between">
        <Heading as='h2' size='lg'>
          Forum
        </Heading>
        <Button
          colorScheme="teal"
          onClick={() => navigate('/forum/create-topic')}
        >
          Create topic
        </Button>
      </Flex>
      {
        isFetching
          ? <Flex justifyContent="center">
              <CircularProgress isIndeterminate color='teal.300' />
            </Flex>
          : <List spacing={3}>
              {
                topicList!.map(
                  ({
                    id,
                    author,
                    avatar,
                    date,
                    title,
                    body,
                    commentsAmount
                  }) => (
                    <TopicPreview
                      key={id}
                      id={id}
                      author={author}
                      avatar={avatar}
                      date={date}
                      title={title}
                      body={body}
                      commentsAmount={commentsAmount}
                      goToTopic={goToTopic}
                    />
                  )
                )
              }
          </List>
      }
    </Box>
  );
}
