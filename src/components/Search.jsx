import { Box, Input } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const url =
    'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10e39868768af1480b8aa89c3efe73fa&safe_search=3&format=json&nojsoncallback=1';
  useEffect(() => {
    const getResults = async () => {
      const { data } = await axios.get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10e39868768af1480b8aa89c3efe73fa&text=${searchText}&safe_search=3&format=json&nojsoncallback=1`
      );
      console.log(data);
    };
    getResults();
  }, [searchText]);
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
