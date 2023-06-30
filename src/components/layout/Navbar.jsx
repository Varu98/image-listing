import { Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Search from '../inputs/Search';

const Navbar = () => {
  return (
    <Flex
      position={'fixed'}
      w={'full'}
      padding={'4'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'gray.800'}
      h={'10rem'}
    >
      <VStack>
        <Text fontSize={'3xl'} fontWeight="bold" color={'white'}>
          Search Photos
        </Text>
        <Search />
      </VStack>
    </Flex>
  );
};

export default Navbar;
