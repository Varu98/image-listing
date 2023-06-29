import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Layout from './components/layout/Layout';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout></Layout>
    </ChakraProvider>
  );
}

export default App;
