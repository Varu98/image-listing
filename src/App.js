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
import ImageCard from './components/cards/ImageCard';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Grid padding={4} gap={'1rem'} gridTemplateColumns={'repeat(3, 1fr)'}>
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </Grid>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
