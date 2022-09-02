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
  const senderNickname = params.nickname; // 상대 닉네임
  const nickname = useSelector((state) => state.auth.nickname); // 본인 닉네임

  const clientRef = useRef(null);
  const [roomId, setRoomId] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatNickname, setChatNickname] = useState('');
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
      console.log('hi');
      const getMessage = JSON.parse(message.body).content;
      const getNickname = JSON.parse(message.body).nickname; // 닉네임
      console.log(getMessage, getNickname, '닉네임 메시지 체크');
      setChatNickname((prev) => (prev = getNickname));
      setChatMessages((_chatMessages) => [..._chatMessages, getMessage]);
    });

    // console.log(`/sub/rooms/${roomId}`, '구독 열로함');
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
        accessToken: token
      },
      body: JSON.stringify({ content: message })
    });

    setMessage(''); // 메세지 초기화
  };

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

  console.log(chatNickname, 'chatNickname');
  console.log(senderNickname, 'senderNickname');
  console.log(nickname, 'nickname');

  return (
    <Container>
      <Navigate text={senderNickname} padding={true} />
      <Divider />
      <ChatContainer>
        <Time>오후 12:34</Time>
        {chatMessages &&
          chatMessages.length > 0 &&
          chatMessages.map((msg, index) => (
            <>
              {senderNickname === chatNickname ? (
                <SenderContainer>
                  <img
                    src="/assets/ocean.png"
                    alt="profileImage"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%'
                    }}
                  />
                  <div className="messageBox">
                    <span>{msg}</span>
                  </div>
                </SenderContainer>
              ) : (
                <ReceiverContainer>
                  <div className="messageBox">
                    <span>{msg}</span>
                  </div>
                </ReceiverContainer>
              )}
            </>
          ))}
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
  margin-bottom: 0.5rem;
`;

const SenderContainer = styled.div`
  display: flex;
  margin: 0.3rem 0;
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
const ReceiverContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0.3rem 0;

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
