import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navigate from '../../layout/Navigate';
import { borderRadius } from '@mui/system';
import { MdSend } from 'react-icons/md';
import { chatApi } from '../../shared/api';

const Chat = () => {
  const params = useParams();

  const nickname = useSelector((state) => state.auth.nickname);
  const [roomId, setRoomId] = useState(null);

  // endpoint : /socket

  // 메세지 받기 infinite scroll? /api/messages/{roomId}

  // 버튼 누르면 메세지 보내기 /pub/messages/{roomId}

  const client = useRef({}); // instance 한번만
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    try {
      const res = chatApi.createChat(params.nickname);
      setRoomId(res.data.roomId);
    } catch (error) {
      // error가 나면 roomId를 받는다.
      setRoomId(error.roomId);
    }
    if (roomId) {
      // 페이지가 로딩 되었을때 클라이언트 활성화 & 구독
      connect();
    }
    // unmount 될때 클라이언트 비활성화
    return () => disconnect();
  }, []);

  useEffect(() => {
    // 페이지가 로딩 되었을때 클라이언트 활성화 & 구독
    connect();
    // unmount 될때 클라이언트 비활성화
    return () => disconnect();
  }, []);

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'ws://http://43.200.6.110/socket', // 웹소켓 서버로 직접 접속
      // webSocketFactory: () => new SockJS('/ws-stomp'), // proxy를 통한 접속
      connectHeaders: {
        'auth-token': token // 토큰 전달
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        // 구독
        subscribe();
      },
      onStompError: (frame) => {
        // error message 출력
        console.error(frame);
      }
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current.deactivate();
  };

  const subscribe = () => {
    //  대상에 대해 메세지를 받기 위해 subscribe 메서드를 사용
    client.current.subscribe(`/sub/rooms/${{ roomId }}`, ({ body }) => {
      setChatMessages((_chatMessages) => [..._chatMessages, JSON.parse(body)]);
    });
  };

  const publish = (message) => {
    // 연결 끊어져 있으면 바로 종료
    if (!client.current.connected) {
      return;
    }

    client.current.publish({
      destination: `/pub/messages/${roomId}`,
      body: JSON.stringify({ nickname, message })
    });

    setMessage('');
  };

  return (
    <Container>
      <Navigate text={nickname} padding={true} />
      <ChatContainer>
        <Time>오후 12:34</Time>
        <MessageContainer>
          <img
            src="/assets/ocean.png"
            alt="profileImage"
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
          <div className="messageBox">
            <span>
              안녕하세요 여기는 채팅창입니다. 누구에게 메시지를 보내실 건가요?
              누구에게 보낼건가요누구에게
            </span>
          </div>
        </MessageContainer>
        {chatMessages && chatMessages.length > 0 && (
          <ul>
            {chatMessages.map((_chatMessage, index) => (
              <li key={index}>{_chatMessage.message}</li>
            ))}
          </ul>
        )}
      </ChatContainer>
      <Footer>
        <Divider />
        <InputMessageContainer>
          <img
            src="/assets/ocean.png"
            alt="profileImage"
            style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          />
          <InputBox>
            <input
              type="text"
              placeholder="메세지를 입력해주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.which === 13 && publish(message)}
            />
            <button onClick={() => publish(message)}>Send</button>
          </InputBox>
        </InputMessageContainer>
      </Footer>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  position: relative;
  height: 100vh;
`;
const ChatContainer = styled.div`
  padding: 1rem;
`;

const Time = styled.p`
  text-align: center;
  font-style: normal;
  font-weight: 300;
  font-size: 0.813rem;
  line-height: 16px;

  color: #8e8e93;
`;

const MessageContainer = styled.div`
  display: flex;
  img {
    margin-top: 0.2rem;
    margin-right: 0.313rem;
  }
  .messageBox {
    padding: 0.625rem;
    gap: 0.625rem;

    max-width: 80%;

    background: #ffffff;
    border: 1px solid #e5e5ea;
    border-radius: 0.813rem;
    span {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const Footer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const InputMessageContainer = styled.div`
  display: flex;

  align-items: center;
  padding: 0.75rem 1rem;
  gap: 0.688rem;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #ececec;
`;

const InputBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #f2f2f7;
  border-radius: 2rem;
  /* padding: 0.625rem; */
  input {
    flex: 1;
    padding: 0.625rem 0.8rem;
    border-radius: 2rem;
    background-color: transparent;
    outline: none;
  }
  button {
    /* border-radius: 0 32px 32px 0; */
    /* border-radius: 32px; */
    font-weight: 400;
    font-size: 0.8rem;
    line-height: 14px;
    padding: 0 0.625rem;
    color: #007aff;
    /* background-color: #007aff;
    svg {
      color: white;
      font-size: 1rem;
    } */
  }
`;
