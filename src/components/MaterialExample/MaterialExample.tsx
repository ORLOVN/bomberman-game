import React from 'react';
import url from '@/assets/images/test.jpg';
import styles from './MaterialExample.module.scss';
import {Box, Button, Heading, Icon, Image, Stack} from '@chakra-ui/react';
import {FaReact} from 'react-icons/fa';

export default function MaterialExample() {
  return (
    <Box pt={'5'}>
      <Box className={styles.heading_box}>
        <Icon mr='2' color={'#1787f5'} as={FaReact}/>
        <Heading as='h1' size='md' noOfLines={1}>
          App component
        </Heading>
      </Box>

      <Image className={styles.img} src={url} alt="Картинка"/>
      <Stack direction='row' spacing={6} justifyContent={'center'}>
        <Button colorScheme='green' variant='solid'>
          I am a button of ⚡ Chakra
        </Button>
        <Button colorScheme='green' variant='outline'>
          Button
        </Button>
      </Stack>
    </Box>
  );
}
