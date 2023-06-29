import { Box, Flex, Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Navbar = () => {
  return (
    <Flex
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
        <Input background={'white'} />
      </VStack>
    </Flex>
  );
};

export default Navbar;
