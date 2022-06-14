import React from 'react';

import { FaRocketchat } from "react-icons/fa";
import { Flex, Heading, Text, Box, Divider, Avatar, Icon } from '@chakra-ui/react';

import styles from './TopicPreview.module.scss';

import FormatDate from '@/components/FormatDate';

type Props = {
    id: number;
    title: string;
    body: string;
    avatar: string | null;
    author: string;
    date: number;
    commentsAmount: number;
    goToTopic: (id: number) => void
};

export default function TopicPreview({
    id,
    title,
    body,
    avatar,
    author,
    date,
    commentsAmount,
    goToTopic,
}: Props) {
    return (
        <Box
            mb={5}
            p={6}
            border='1px'
            borderRadius={5}
            borderColor='gray.400'
        >
            <Heading
                as='h3' size='md'
                mb={4}
                onClick={() => goToTopic(id)}
                className={styles.header}
            >
                { title }
            </Heading>
            <Text fontSize='sm'>{body}</Text>
            <Divider mt={4} mb={4} />
            <Flex
                justifyContent="space-between"
                alignItems="center"
            >
                <Flex alignItems="center">
                    <Avatar name={author} src={avatar || ''} />
                    <Text fontSize='xs' ml={4}>Posted by</Text>
                    <Heading
                        as='h4' size='xs'
                        ml={2}
                    >
                        { author }
                    </Heading>
                    
                </Flex>
                <Flex alignItems="center">
                    <Text fontSize='xs' mr={4}>
                        <FormatDate value={date} />
                    </Text>
                    <Icon mr="2" color="#1787f5" as={FaRocketchat} />
                    <Text fontSize='xs' ml={1}>
                        {commentsAmount}
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
}
