import { Box, Input, List, ListItem } from '@chakra-ui/react';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useImages } from '../../contexts/useImages';

const Search = () => {
  const { setSearchText, cacheSearch, searchText } = useImages();
  const [toggleSuggestions, setToggleSuggestions] = useState(false);

  console.log(cacheSearch);

  const debouncedSearch = debounce(value => {
    setSearchText(value);
    console.log(value);
  }, 500);

  const handleSearchInput = e => {
    const { value } = e.target;
    debouncedSearch(value);
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
      <Input
        position={'relative'}
        onChange={handleSearchInput}
        background={'white'}
      />
      {searchText.length > 0 && (
        <List
          onMouseLeave={() => {
            setToggleSuggestions(false);
          }}
          w={'full'}
          px={4}
          bgColor={'white'}
          position={'absolute'}
        >
          {cacheSearch.map(item => (
            <ListItem pt={1}>{item}</ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default Search;
