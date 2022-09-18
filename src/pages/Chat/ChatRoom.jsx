import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navigate from '../../layout/Navigate';
import { useRooms } from '../../react-query/hooks/chat/useRooms';
import { useInView } from 'react-intersection-observer';
import Loading from '../../layout/Loading';
import NoData from '../../layout/NoData';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../react-query/constants';

const ChatRoom = () => {
  const navigate = useNavigate();
  const nickname = useSelector((state) => state.auth.nickname);
  const profileImg = useSelector((state) => state.auth.profileImg);

  const { rooms, isFetchingNextPage, fetchNextPage } = useRooms();
  const { ref, inView } = useInView();

  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([queryKeys.rooms, nickname], {
      refetchType: 'all'
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <Container>
      <Navigate text={'채팅'} padding={true} />
      {rooms.pages[0].data.length === 0 && (
        <NoData text={'받은 메세지'} chat={true} />
      )}
      {rooms.pages.map((page) => {
        return page.data.map((room) => {
          let roomName;
          roomName =
            nickname === room.receiverNickname
              ? room.senderNickname
              : room.receiverNickname;

          let roomProfileImg;
          roomProfileImg =
            profileImg === room.receiverProfileImg
              ? room.senderProfileImg
              : room.receiverProfileImg;

          return (
            <div
              key={room.roomId}
              className="chatContainer"
              onClick={() => navigate(`/chat/${roomName}`)}
            >
              <LeftBox>
                <img
                  src={roomProfileImg}
                  alt=""
                  style={{ width: '36px', height: '36px' }}
                />
                <div className="leftBox">
                  <p className="nickname">{roomName}</p>
                  <p className="lastMessage">{room.lastMsg}</p>
                </div>
              </LeftBox>
            </div>
          );
        });
      })}
      {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
    </Container>
  );
};

const Container = styled.div`
  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    width: 40vw;
  }

  div.chatContainer {
    &:hover {
      background: #f7faff;
    }
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    margin-top: 0.5rem;
    box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
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
    color: #8e8e93;

    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 1; //원하는 라인수
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default ChatRoom;
