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

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchImages = async () => {
      const { data } = await axios.get(
        'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=10e39868768af1480b8aa89c3efe73fa&format=json&nojsoncallback=1'
      );
      if (data) setImages(data.photos.photo);
      setLoading(false);
      // console.log(data.photos);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Grid padding={4} gap={'10rem'} gridTemplateColumns={'repeat(3, 1fr)'}>
          {loading ? (
            <p>loading</p>
          ) : (
            images.map(image => <ImageCard image={image} />)
          )}
        </Grid>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
