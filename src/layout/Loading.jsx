import { Spinner } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      role="status"
      position="fixed"
      zIndex="9999"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      color="blue.500"
      size="xl"
    />
  );
};

export default Loading;
