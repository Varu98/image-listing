import { GridItem, Image, Text } from '@chakra-ui/react';
import React from 'react';

const ImageCard = ({ image }) => {
  const { id, server, secret } = image;
  return (
    <GridItem
      rounded="md"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Image
        src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
      />
    </GridItem>
  );
};

export default ImageCard;
