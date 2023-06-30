import { GridItem, Image, Text } from '@chakra-ui/react';
import React from 'react';

const ImageCard = ({ image }) => {
  const { id, server, secret } = image;
  //www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=10e39868768af1480b8aa89c3efe73fa&format=json&nojsoncallback=1
  https: return (
    <GridItem
      rounded="md"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      {/* <Image
        src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
      /> */}
      <Image
        src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
      />
    </GridItem>
  );
};

export default ImageCard;
