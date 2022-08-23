import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <MoonLoader color="#007AFF" size={30} speedMultiplier={0.6} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;

  justify-content: center;
`;

export default Loading;
