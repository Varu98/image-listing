import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Box, Flex, Grid } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Flex minH={'100vh'} justifyContent="" flexDirection={'column'}>
      <Navbar />
      <Box mt={'10rem'} flexGrow={'1'}>
        {children}
      </Box>
    </Flex>
  );
};

export default Layout;
