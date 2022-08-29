import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { useSelector } from 'react-redux';

const Chat = () => {
  const { roomId } = useParams();
  const nickname = useSelector((state) => state.auth.nickname);

  // endpoint : /socket

  // 메세지 받기 infinite scroll? /api/messages/{roomId}

  // 버튼 누르면 메세지 보내기 /pub/messages/{roomId}

  const client = useRef({}); // instance 한번만
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('accessToken');

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
        'auth-token': token
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
        // error message
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
    <div>
      {chatMessages && chatMessages.length > 0 && (
        <ul>
          {chatMessages.map((_chatMessage, index) => (
            <li key={index}>{_chatMessage.message}</li>
          ))}
        </ul>
      )}
      <div>
        <input
          type={'text'}
          placeholder={'메세지를 입력해주세요'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.which === 13 && publish(message)}
        />
        <button onClick={() => publish(message)}>send</button>
      </div>
    </div>
  );
};

export default Chat;
