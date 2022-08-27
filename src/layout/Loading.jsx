import React from "react";
// import CircleLoader from 'react-spinners/CircleLoader';
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <img src={"/assets/waterwave.gif"} alt="" />
      {/* <CircleLoader color="#007AFF" size={100} speedMultiplier={1} /> */}
    </Container>
  );
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

export default Loading;
