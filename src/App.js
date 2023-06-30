import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useImages } from './contexts/useImages';

function App() {
  const { images, loading, noResultsToShow } = useImages();

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Grid padding={4} gap={'10rem'} gridTemplateColumns={'repeat(3, 1fr)'}>
          {loading ? (
            <p>loading</p>
          ) : noResultsToShow ? (
            <p>no results to show</p>
          ) : (
            images.map(image => <ImageCard image={image} />)
          )}
        </Grid>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
