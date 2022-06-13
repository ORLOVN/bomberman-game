import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Box, CircularProgress, Flex } from '@chakra-ui/react';

import Header from './components/Header';
import CommentList from './components/CommentList';
import Textarea from './components/Textarea';

import { SendMessageFormType } from './components/Textarea/types';
import { mock } from './constants';

import { Topic as TopicType } from '@/types';

export default function Topic() {
    const [isLoadingMain] = useState(false);
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [data] = useState<TopicType>(mock);

    const { id: topicId } = useParams();

    const sendCommentHandler = (
        setSubmitting: (isSubmitting: boolean) => void,
        values: SendMessageFormType,
    ) => {
        setSubmitting(true);
        setLoadingComments(true);

        setTimeout(() => {
            console.log(values, 'topic id', topicId);
            setSubmitting(false);
            setLoadingComments(false);
        }, 1000);
    };

    const { author, avatar, title, body, date, comments } = data;

    return (
        <Box mt={4} w={1000}>
            {
                isLoadingMain
                    ?   <Flex justifyContent="center">
                            <CircularProgress isIndeterminate color='teal.300' />
                        </Flex>
                    : <>
                        <Header
                            author={author}
                            avatar={avatar || ''}
                            title={title}
                            body={body}
                            date={date}
                        />
                        <CommentList
                            comments={comments}
                            isLoading={isLoadingComments}
                        />
                        <Textarea onSubmit={sendCommentHandler} />
                    </>
            }
        </Box>
    );
}
