import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Flex, Icon, Text } from '@chakra-ui/react';

import { FaAngleDown, FaAngleUp, FaReply } from 'react-icons/fa';

import FormatDate from '@/components/FormatDate';

import Textarea, { SendMessageFormType } from '../Textarea';
import CommentList from '../CommentList';

import { CommentProps } from './types';

export default function Comment({
    id,
    author,
    date,
    message,
    avatar,
    comments
}: CommentProps) {
    const [isLoadingComments, setLoadingComments] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [showTextarea, setShowTextarea] = useState(false);

    const sendCommentHandler = (
        setSubmitting: (isSubmitting: boolean) => void,
        values: SendMessageFormType,
    ) => {
        setSubmitting(true);
        setLoadingComments(true);

        setTimeout(() => {
            console.log(values, 'comment id:', id);
            setSubmitting(false);
            setLoadingComments(false);
        }, 1000);
    };

    const replyContainer = comments && (
        <Box mb={4} color={showTextarea || showComments ? 'gray' : 'teal'}>
            <Text
                fontSize='xs'
                as="ins"
                cursor="pointer"
                color={showTextarea || showComments ? 'gray' : 'teal'}
                onClick={() => setShowTextarea(prev => !prev)}
            >
                <Icon mr={2} as={FaReply} />
                Reply
            </Text>
            
        </Box>
    );

    const toggleCommentsBtn = Boolean(comments?.length) && (
        <Flex justifyContent="center">
            <Button
                size="sm"
                onClick={() => setShowComments(prev => !prev)}
                rightIcon={
                    <Icon as={showComments ? FaAngleUp : FaAngleDown}/>
                }
                {
                    ...(
                        showComments
                            ? { color: "teal", }
                            : { colorScheme: "teal" }
                    )
                }
            >
                Comments (
                    {comments!.length}
                )
            </Button>
        </Flex>
    );

    const nestedContainer = (showComments || showTextarea) && (
        <Box py={2}>
            {
                showComments && comments && (
                    <CommentList
                        isNested
                        comments={comments}
                        isLoading={isLoadingComments}
                    />
                )
            }
            <Textarea onSubmit={sendCommentHandler} />
        </Box>
    );

    return (
        <Flex>
            <Flex
                mr={4}
                flexDirection="column"
                alignItems="center"
            >
                <Avatar
                    name={author}
                    src={avatar}
                />
                <Divider orientation='vertical' />
            </Flex>
            <Box mb={2}>
                <Text my={1} fontSize='sm' fontWeight="bold">
                    {author}
                </Text>
                <Text fontSize='xs'>
                    <FormatDate value={date} />
                </Text>
                <Text my={4} fontSize='sm'>
                    {message}
                </Text>
                { replyContainer }
                { toggleCommentsBtn }
                { nestedContainer }
            </Box>
        </Flex>
    );
}
