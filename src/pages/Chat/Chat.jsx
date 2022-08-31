import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp, Client } from '@stomp/stompjs';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Navigate from '../../layout/Navigate';
import { borderRadius } from '@mui/system';
import { MdSend } from 'react-icons/md';
import { chatApi } from '../../shared/api';

const Chat = () => {
  const params = useParams();

  const clientRef = useRef(null);

  const nickname = useSelector((state) => state.auth.nickname);
  const [roomId, setRoomId] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('accessToken');
  const headers = { accessToken: token };

  // const sock = new SockJs('http://43.200.6.110/socket');
  //client 객체 생성 및 서버주소 입력

  // const client = StompJs.over(sock);
  // stomp로 감싸기

  const connect = () => {
    console.log('웹소켓 연결');
    // client객체를 만들기
    clientRef.current = new Client({
      brokerURL: 'ws://43.200.6.110/socket', // 웹소켓 서버로 직접 접속
      webSocketFactory: () => new SockJS('http://43.200.6.110/socket'), // proxy를 통한 접속
      connectHeaders: {
        headers // 토큰 전달
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000, //자동 재 연결
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

    // 클라이언트 활성화
    clientRef.current.activate();
  };

  const disconnect = () => {
    console.log('클라이언트 비활성화시킬거임');
    clientRef.current.deactivate();
  };

  const subscribe = () => {
    //  대상에 대해 메세지를 받기 위해 subscribe 메서드를 사용
    clientRef.current.subscribe(`/sub/rooms/${roomId}`, (message) => {
      const getMessage = JSON.parse(message.body).content;
      // const getNickname = JSON.parse(message.body).nickname; // 닉네임
      console.log(
        getMessage,
        JSON.parse(message.body),
        '받은 메세지와 닉네임 '
      );
      setChatMessages((_chatMessages) => [..._chatMessages, getMessage]);
    });

    console.log(`/sub/rooms/${roomId}`, '구독 열로함');
  };

  console.log(clientRef.current, 'clientcheck');

  const publish = (message) => {
    // 연결 끊어져 있으면 바로 종료

    if (!clientRef.current.connected) {
      console.log('종료');
      return;
    }

    clientRef.current.publish({
      destination: `/pub/messages/${roomId}`,
      headers: {
        accessToken: token || ''
      },
      body: JSON.stringify({ content: message })
    });

    console.log(`/pub/messages/${roomId}`, '여기로 보냄');

    setMessage(''); // 메세지 초기화
  };

  console.log(chatMessages, '받은 메세지목록 체크해보자!!!!!!!!');

  useEffect(() => {
    async function getRoomId() {
      try {
        // 방생성 요청
        const res = await chatApi.createChat(params.nickname);
        const getRoomId = res.response.data.roomId;
        setRoomId(getRoomId);
      } catch (error) {
        // error가 나면 roomId를 받는다.
        console.log(error, 'error');
      }
    }
    getRoomId();

    // unmount 될때 클라이언트 비활성화
    return () => disconnect();
  }, []);

  useEffect(() => {
    if (roomId) {
      console.log(roomId, 'roomId');
      // 페이지가 로딩 되고 roomId가 있을때 클라이언트 활성화 & 구독
      connect();
    }
  }, [roomId]);

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
            {chatMessages.map((msg, index) => (
              <li key={index}>{msg}</li>
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
