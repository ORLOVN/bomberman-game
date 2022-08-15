import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Flex, Icon, Text } from '@chakra-ui/react';

import { FaAngleDown, FaAngleUp, FaReply } from 'react-icons/fa';

import { FormikState } from 'formik';
import { useParams } from 'react-router-dom';

import FormatDate from '@/components/FormatDate';

import Textarea, { SendMessageFormType } from '../Textarea';
import CommentList from '../CommentList';

import { CommentProps } from './types';
import { useAppSelector } from '@/hooks';
import { forumApiService } from '@/store';

export default function Comment({
    id,
    author,
    date,
    message,
    avatar,
    comments,
    refetch,
    isLoadingComments,
    commentsAmount,
}: CommentProps) {
    const [showComments, setShowComments] = useState(false);
    const [showTextarea, setShowTextarea] = useState(false);

    const [showLoading, setShowLoading] = useState(false);

    if (!isLoadingComments) {
        setShowLoading(false);
    }

    const user = useAppSelector((state) => state.auth.user);
    const { id: topicId } = useParams();

    const [createCommentHanlder] = forumApiService.useCreateCommentMutation();

    const sendCommentHandler = (
        setSubmitting: (isSubmitting: boolean) => void,
        resetForm: (nextState?: Partial<FormikState<any>>) => void,
        values: SendMessageFormType,
    ) => {
        setSubmitting(true);

        setTimeout(() => {
            console.log(values, 'comment id:', id);
            setSubmitting(false);
            const data = {
                yaId: user.id,
                topicId: topicId!,
                parentCommentId: id,
                body: values.body,
            };
            createCommentHanlder(data)
                .unwrap()
                .then()
                .finally(
                    () => {
                        setShowLoading(true);
                        refetch();
                        resetForm();
                        setSubmitting(false);
                    }
                )
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
                        commentsAmount={commentsAmount}
                        refetch={refetch}
                        comments={comments}
                        isLoadingComments={isLoadingComments && showLoading}
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
