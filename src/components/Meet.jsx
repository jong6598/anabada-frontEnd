import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Meet = ({ meet }) => {
  const navigate = useNavigate();

  return (
    <MeetContinaer onClick={() => navigate(`/meets/${meet.meetId}`)}>
      <LeftWrapper>
        <img src={meet.thumbnailUrl} alt="meetimg" />
      </LeftWrapper>
      <RightWrapper>
        <h2>{meet.title}</h2>
        <div>
          <p>인원</p>
          <p>날짜</p>
          <p>장소</p>
          <p>{meet.nickname}</p>
        </div>
      </RightWrapper>
      <button>참석</button>
      <p>모집 완료</p>
    </MeetContinaer>
  );
};

const MeetContinaer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ececec;
  margin-bottom: 1rem;
  cursor: pointer;
  padding: 1rem;

  button {
    background-color: blue;
    color: white;
    padding: 1rem;
    border-radius: 8px;
  }
`;

const LeftWrapper = styled.div`
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }
`;

const RightWrapper = styled.div`
  text-align: center;
  div {
    display: flex;
    p {
      margin: 0 1rem;
    }
  }
`;

export default Meet;
