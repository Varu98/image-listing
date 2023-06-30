import { GridItem, Image, Text, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ImageModal from '../modals/ImageModal';

const ImageCard = ({ image }) => {
  const { id, server, secret } = image;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GridItem
      rounded="md"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      _hover={{ cursor: 'pointer' }}
      onClick={onOpen}
    >
      <Image
        src={`https://live.staticflickr.com/${server}/${id}_${secret}.jpg`}
      />
      <ImageModal image={image} onClose={onClose} isOpen={isOpen} />
    </GridItem>
  );
};

export default ImageCard;
