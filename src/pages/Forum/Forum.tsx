import { Box, Button, Heading, List, Flex, CircularProgress } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicPreview from "./components/TopicPreview";
import { mock } from "./constants";

export default function Forum() {
  const navigate = useNavigate();

  const [topicList] = useState(mock);
  const [loading] = useState(false);

  const goToTopic = (id: number) => navigate(`/forum/topic/${id}`);

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
        loading
          ? <Flex justifyContent="center">
              <CircularProgress isIndeterminate color='teal.300' />
            </Flex>
          : <List spacing={3}>
              {
                topicList.map(
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
