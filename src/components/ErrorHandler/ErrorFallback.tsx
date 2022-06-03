import React from 'react';
import styles from './ErrorFallback.module.scss';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button} from '@chakra-ui/react';


export default function ErrorFallback({error}: {error: Error | null}) {
  return (
    <Box className={styles.alert}>
      <Alert
        status='error'
        variant='subtle'
        width={'600px'}
        className={styles.alert__box}
      >
        <AlertIcon boxSize='40px' />
        <AlertTitle mt={4} mb={1} fontSize='lg'>
          The following error has just occurred:
        </AlertTitle>
        <AlertDescription mb={4} maxWidth='sm'>
          {error?.message}
        </AlertDescription>
        <Button as={'a'} href="/" colorScheme='green' variant='outline'>
          Go to the home page
        </Button>
      </Alert>
    </Box>
  );
}
