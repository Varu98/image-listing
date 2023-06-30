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
import InfiniteScroll from 'react-infinite-scroll-component';

function App() {
  const { images, loading, noResultsToShow, fetchImages } = useImages();

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <InfiniteScroll
          dataLength={images.length}
          next={fetchImages}
          hasMore={true}
          loader={<p>loading...</p>}
        >
          <Grid
            padding={4}
            gap={'10rem'}
            gridTemplateColumns={[
              'repeat(1, 1fr)',
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
            ]}
          >
            {noResultsToShow ? (
              <p>no results to show</p>
            ) : (
              images.map(image => <ImageCard image={image} />)
            )}
          </Grid>
        </InfiniteScroll>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
