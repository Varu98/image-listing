import { Box, GridItem, Image, Text } from '@chakra-ui/react';
import React from 'react';

const ImageCard = () => {
  return (
    <GridItem rounded="md" h={'20rem'} bg="gray.200">
      <Text w={'25rem'}>ImageCard</Text>
      <Image />
    </GridItem>
  );
};

export default ImageCard;
