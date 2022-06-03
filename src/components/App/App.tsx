import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import MaterialExample from '@/components/MaterialExample';

export default function App() {
  return (
    <ChakraProvider>
      <MaterialExample/>
    </ChakraProvider>
  );
}
