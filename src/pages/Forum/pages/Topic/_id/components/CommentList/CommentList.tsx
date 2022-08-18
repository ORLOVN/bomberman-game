import React from 'react';

import { CircularProgress, Divider, Flex, Heading } from '@chakra-ui/react';

import Comment from '../Comment';

import { hasNestedComments } from './utils';
import { CommentsProps } from './types';

export default function CommentList({
    comments,
    commentsAmount,
    isLoadingComments,
    isNested = false,
    refetch
}: CommentsProps) {
    return (
        <>
            {
                !isNested && (
                    <>
                        <Divider mb={3} />
                        <Heading as='h5' size='md'>
                            Comments (
                                {commentsAmount}
                            )
                        </Heading>
                        <Divider mb={8} mt={3} />
                    </>
                )
            }
            {
              (comments || []).map(
                    ({id, author, date, body, avatar, ...rest}) => (
                        <Comment
                            key={id}
                            id={id}
                            author={author}
                            date={date}
                            message={body}
                            avatar={avatar || ''}
                            refetch={refetch}
                            isLoadingComments={isLoadingComments}
                            commentsAmount={commentsAmount}
                            {
                                ...(
                                    hasNestedComments(rest) && (
                                            {
                                                comments: rest.comments
                                            }
                                        )
                                )
                            }
                        />
                    )
                )
            }
            {
                isLoadingComments && (
                    <Flex justifyContent="center" >
                        <CircularProgress
                            isIndeterminate
                            color='teal.300'
                        />
                    </Flex>
                )
            }
        </>
    );
}
