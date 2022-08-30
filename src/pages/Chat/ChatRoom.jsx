import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navigate from '../../layout/Navigate';

const ChatRoom = () => {
  const navigate = useNavigate();
  const roomId = '';
  return (
    <>
      <Navigate text={'채팅'} padding={true} />
      <Container>
        <ul>
          <li onClick={navigate(`/chat/${roomId}`)}>
            <ChatContainer>
              <img
                src="/assets/ocean.png"
                alt=""
                style={{ width: '36px', height: '36px' }}
              />
              <div className="leftBox">
                <p className="nickname">nickname</p>
                <p className="lastMessage">안녕하세요. 반가워요</p>
              </div>
            </ChatContainer>
            <p className="messageLength">12</p>
          </li>
        </ul>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 0 1rem;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid #ececec;
  }

  img {
    border-radius: 50%;
    margin-right: 0.688rem;
  }
  .messageLength {
    padding: 3px 7px;
    gap: 10px;

    background: #ff3b30;
    border-radius: 3rem;

    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 0.875rem;
    color: #ffffff;
  }
`;

const ChatContainer = styled.div`
  display: flex;
  .nickname {
    font-weight: 500;
    font-size: 0.938rem;
    line-height: 1.125rem;
    margin-bottom: 0.25rem;
  }
  .lastMessage {
    font-weight: 400;
    font-size: 0.938rem;
    line-height: 1.125rem;
    /* identical to box height */
    color: #8e8e93;
  }
`;

export default ChatRoom;
