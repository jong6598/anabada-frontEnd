import React from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <img src={'/assets/waterwave.gif'} alt="" />
    </Container>
  );
};

export const InfiniteLoading = () => {
  <LoadingContainer>
    <CircleLoader color="#007AFF" size={100} speedMultiplier={1} />;
  </LoadingContainer>;
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 10rem;
    height: 10rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default Loading;
