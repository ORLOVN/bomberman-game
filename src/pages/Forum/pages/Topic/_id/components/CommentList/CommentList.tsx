import React from 'react';

import { CircularProgress, Divider, Flex, Heading } from '@chakra-ui/react';

import Comment from '../Comment';

import { hasNestedComments } from './utils';
import { CommentsProps } from './types';

export default function CommentList({
    comments,
    isLoading,
    isNested = false
}: CommentsProps) {
    return (
        <>
            {
                !isNested && (
                    <>
                        <Divider mb={3} />
                        <Heading as='h5' size='md'>
                            Comments (
                                {comments.length}
                            )
                        </Heading>
                        <Divider mb={8} mt={3} />
                    </>
                )
            }
            {
                comments.map(
                    ({id, author, date, body, avatar, ...rest}) => (
                        <Comment
                            key={id}
                            id={id}
                            author={author}
                            date={date}
                            message={body}
                            avatar={avatar || ''}
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
                isLoading && (
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
