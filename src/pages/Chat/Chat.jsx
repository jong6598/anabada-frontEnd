import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Navigate from "../../layout/Navigate";
import { chatApi } from "../../shared/api";
import { useMessages } from "../../react-query/hooks/chat/useMessages";
import { useInView } from "react-intersection-observer";
import { useCallback } from "react";

const Chat = () => {
  const params = useParams();
  const senderNickname = params.nickname; // 상대 닉네임
  const nickname = useSelector((state) => state.auth.nickname); // 본인 닉네임
  const profileImg = useSelector((state) => state.auth.profileImg);

  const scrollRef = useRef();

  const { ref, inView } = useInView();

  const clientRef = useRef(null);
  const [roomId, setRoomId] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);
  const [senderProfileImg, setSenderProfileImg] = useState("");
  const [receiverProfileImg, setReceiverProfileImg] = useState("");
  const [message, setMessage] = useState("");

  const isMessage = message !== "";

  const [prevScrollHeight, setPrevScrollHeight] = useState("");

  const token = localStorage.getItem("accessToken");
  const headers = { accessToken: token };

  //roomId가 있을때 요청
  const { messages, fetchNextPage, isFetchingNextPage, __setRoomId } =
    useMessages();

  // const sock = new SockJs('http://43.200.6.110/socket');
  //client 객체 생성 및 서버주소 입력

  // const client = StompJs.over(sock);
  // stomp로 감싸기

  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const connect = () => {
    // client객체를 만들기
    clientRef.current = new Client({
      brokerURL: `ws://${process.env.REACT_APP_API_SERVER}/socket`, // 웹소켓 서버로 직접 접속
      webSocketFactory: () =>
        new SockJS(`https://${process.env.REACT_APP_API_SERVER}/socket`), // proxy를 통한 접속
      connectHeaders: {
        headers, // 토큰 전달
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
      },
    });

    // 클라이언트 활성화
    clientRef.current.activate();
  };

  const disconnect = () => {
    clientRef.current.deactivate();
  };

  const subscribe = () => {
    //  대상에 대해 메세지를 받기 위해 subscribe 메서드를 사용
    clientRef.current.subscribe(`/sub/rooms/${roomId}`, (message) => {
      const getMessage = JSON.parse(message.body).content;
      const getNickname = JSON.parse(message.body).nickname; // 닉네임

      setChatMessages((_chatMessages) => [
        ..._chatMessages,
        { nickname: getNickname, message: getMessage },
      ]);
    });
  };

  const publish = (message) => {
    // 연결 끊어져 있으면 바로 종료

    if (!clientRef.current.connected) {
      return;
    }

    clientRef.current.publish({
      destination: `/pub/messages/${roomId}`,
      headers: {
        accessToken: token,
      },
      body: JSON.stringify({ content: message }),
    });

    setMessage(""); // 메세지 초기화
  };

  const scrollToBottom = () => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  };

  useEffect(() => {
    async function getRoomId() {
      try {
        // 방생성 요청
        const res = await chatApi.createChat(params.nickname);

        let getRoomId, getSenderProfileImg, getReceiverProfileImg;
        if (res.status === 200) {
          getRoomId = res.data.roomId;

          getSenderProfileImg = res.data.senderProfileImg;
          getReceiverProfileImg = res.data.receiverProfileImg;
        } else {
          getRoomId = res.response.data.roomId;
          getSenderProfileImg = res.response.data.senderProfileImg;
          getReceiverProfileImg = res.response.data.receiverProfileImg;
        }

        setReceiverProfileImg(getReceiverProfileImg);
        setSenderProfileImg(getSenderProfileImg);
        setRoomId(getRoomId);

        __setRoomId(getRoomId);
      } catch (error) {
        // error가 나면 roomId를 받는다.
        // console.log(error, 'error');
      }
    }
    getRoomId();

    // unmount 될때 클라이언트 비활성화
    return () => disconnect();
  }, []);

  useEffect(() => {
    if (roomId) {
      // 페이지가 로딩 되고 roomId가 있을때 클라이언트 활성화 & 구독
      connect();
    }
  }, [roomId]);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  // TODO: 역방향 스크롤
  const onFetchMessages = useCallback(() => {
    // 1. 스크롤이 최상단에 닿여서 데이터를 불러오기전에 현재 scrollHeight를 저장한다
    // 2. 새로운 데이터를 불러왔을때 scrollHeight에서 저장해둔 scrollHeight를 뺀값이 현재 스크롤 위치
    setPrevScrollHeight(scrollRef.current?.scrollHeight);

    fetchNextPage();
  }, []);

  const onScrollTo = (y) => {
    scrollRef.current.scrollTop = y;
  };

  useEffect(() => {
    // 화면에 노출되면, 데이터를 불러오는 함수를 실행
    if (inView && messages) {
      onFetchMessages();
    }
  }, [inView]);

  useEffect(() => {
    if (prevScrollHeight) {
      onScrollTo(scrollRef.current?.scrollHeight - prevScrollHeight);
      return setPrevScrollHeight(null);
    }
    onScrollTo(
      scrollRef.current?.scrollHeight - scrollRef.current?.clientHeight
    );
  }, [messages?.pages]);

  return (
    <Container>
      <Navigate
        text={senderNickname}
        padding={true}
        profileImg={receiverProfileImg}
      />
      <Divider />
      <ChatContainer ref={scrollRef}>
        {isFetchingNextPage ? <div /> : <div ref={ref}></div>}

        {messages?.pages?.map((page) => {
          return page.data.map((msg, idx) =>
            msg.nickname !== nickname ? (
              <SenderContainer key={idx}>
                {idx === 0 ||
                (idx >= 1 &&
                  page.data[idx - 1].nickname !== page.data[idx].nickname) ? (
                  <>
                    <img
                      src={receiverProfileImg}
                      alt="profileImage"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="firstMessageBox">
                      <span>{msg.content}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={senderProfileImg}
                      alt="profileImage"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        visibility: "hidden",
                      }}
                    />
                    <div className="messageBox">
                      <span>{msg.content}</span>
                    </div>
                  </>
                )}
              </SenderContainer>
            ) : (
              <ReceiverContainer key={idx}>
                <div className="messageBox">
                  <span>{msg.content}</span>
                </div>
              </ReceiverContainer>
            )
          );
        })}

        {chatMessages &&
          chatMessages.length > 0 &&
          chatMessages.map((msg, index) =>
            msg.nickname !== nickname ? (
              <SenderContainer key={index}>
                {index === 0 ||
                (index >= 1 &&
                  chatMessages[index - 1].nickname !==
                    chatMessages[index].nickname) ? (
                  <>
                    <img
                      src={receiverProfileImg}
                      alt="profileImage"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                      }}
                    />
                    <div className="firstMessageBox">
                      <span>{msg.message}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <img
                      src={senderProfileImg}
                      alt="profileImage"
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        visibility: "hidden",
                      }}
                    />
                    <div className="messageBox">
                      <span>{msg.message}</span>
                    </div>
                  </>
                )}
              </SenderContainer>
            ) : (
              <ReceiverContainer key={index}>
                <div className="messageBox">
                  <span>{msg.message}</span>
                </div>
              </ReceiverContainer>
            )
          )}
      </ChatContainer>
      <Footer>
        <Divider />
        <InputMessageContainer>
          <img
            src={profileImg}
            alt="profileImage"
            style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
          />
          <InputBox>
            <input
              type="text"
              placeholder="메세지를 입력해주세요"
              value={message}
              onChange={onChange}
              onKeyPress={(e) =>
                e.target.value !== "" && e.which === 13 && publish(message)
              }
            />
            <MessageButton
              disabled={!isMessage}
              isMessage={isMessage}
              onClick={() => publish(message)}
            >
              Send
            </MessageButton>
          </InputBox>
        </InputMessageContainer>
      </Footer>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  /* position: relative; */
  border-right: solid 1px #ececec;
  border-left: solid 1px #ececec;
  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    width: 40%;
  }

  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const ChatContainer = styled.div`
  padding: 1rem;

  flex: 1;

  overflow-y: auto;
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
  .firstMessageBox {
    position: relative;
    padding: 0.625rem;
    gap: 0.625rem;

    max-width: 80%;

    word-break: break-all;

    background: #ffffff;
    border: 1px solid #e5e5ea;
    border-radius: 0.813rem;

    span {
      font-size: 15px;
      line-height: 18px;
    }
  }

  .messageBox {
    padding: 0.625rem;
    gap: 0.625rem;

    max-width: 80%;
    word-break: break-all;

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
    word-break: break-all;

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
  /* position: absolute;
  bottom: 0; */
  width: 100%;
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
    border: none;
  }
`;
const MessageButton = styled.button`
  /* border-radius: 0 32px 32px 0; */
  /* border-radius: 32px; */
  font-weight: 400;
  font-size: 0.8rem;
  line-height: 14px;
  padding: 0 0.625rem;
  color: ${(props) => (props.isMessage ? "#007aff" : "gray")};
  /* background-color: #007aff;
    svg {
      color: white;
      font-size: 1rem;
    } */
`;
