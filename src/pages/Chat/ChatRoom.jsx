import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Divider from '../../layout/Divider';
import Navigate from '../../layout/Navigate';
import { useRooms } from '../../react-query/hooks/chat/useRooms';
import { useInView } from 'react-intersection-observer';
import Loading from '../../layout/Loading';

const ChatRoom = () => {
  const navigate = useNavigate();

  const { data, isFetchingNextPage, fetchNextPage } = useRooms();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <Navigate text={'채팅'} padding={true} />
      <Divider />
      <Container>
        {data.pages.map((page) => {
          return page.data.map((room) => (
            <div
              className="chatContainer"
              onClick={navigate(`/chat/${room.roomId}`)}
            >
              <LeftBox>
                <img
                  src={room.senderProfileImg}
                  alt=""
                  style={{ width: '36px', height: '36px' }}
                />
                <div className="leftBox">
                  <p className="nickname">{room.senderNickname}</p>
                  <p className="lastMessage">마지막메세지로 바꺼야함</p>
                </div>
              </LeftBox>
              <p className="messageLength">12</p>
            </div>
          ));
        })}
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </Container>
    </>
  );
};

const Container = styled.div`
  /* padding: 0 1rem; */

  div.chatContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
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

const LeftBox = styled.div`
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
