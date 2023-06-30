import { Box, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useImages } from '../../contexts/useImages';

const Search = () => {
  const { setSearchText } = useImages();

  const handleSearchInput = e => {
    const { value } = e.target;
    setSearchText(value);
    console.log(value);
  };
  return (
    <Box position={'relative'} bg={'blue.500'}>
      <Box
        color="blue.500"
        position={'absolute'}
        zIndex={'10'}
        top={'3'}
        right={'2'}
      >
        <FaSearch />
      </Box>
      <Input onChange={handleSearchInput} background={'white'} />
    </Box>
  );
};

export default Search;
