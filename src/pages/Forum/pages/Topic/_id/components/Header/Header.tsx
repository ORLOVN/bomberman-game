import React from 'react';

import { Avatar, Box, Flex, Heading, Text } from '@chakra-ui/react';

import FormatDate from '@/components/FormatDate';

import { HeaderProps } from './types';

export default function Header({
    title,
    author,
    date,
    body,
    avatar,
}: HeaderProps) {
    return (
        <Box mb={8}>
            <Heading as='h4' size='md'>
                {title}
            </Heading>
            <Flex mt={8} mb={2} alignItems="center">
                <Avatar
                    name={author}
                    src={avatar ? `${process.env.PROXY_API_PATH}/resources${avatar}` : ''}
                />
                <Box ml={4}>
                    <Heading as='h5' size='sm' mb={1}>
                        {author}
                    </Heading>
                    <Text fontSize='xs'>
                        <FormatDate value={date} />
                    </Text>
                </Box>
            </Flex>
            <Text mt={8} fontSize='md'>
                {body}
            </Text>
        </Box>
    );
}
