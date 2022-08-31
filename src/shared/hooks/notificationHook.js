import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const socketServerURL = `http://${process.env.REACT_APP_API_SERVER}/socket`;

export const useNotification = (userId) => {
  const socketRef = useRef(null);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  // 알림 뱃지가 있는지?... state
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socketRef.current = new SockJS(socketServerURL);
    stompClientRef.current = Stomp.over(socketRef.current);

    // 이건 왜 넣었지? => 글쓴이의 답. ::: 이걸 안넣으면 콘솔에 계속 뜸
    stompClientRef.current.debug = () => {
      return;
    };

    // 소켓과 스톰프에 아무것도 할당된 것이 없다면, 즉 socket 객체가 나오지 않거나 stomp가 소켓 위에 올라가지 않는다면 종료
    // 그럼 이런 경우는 언제 있을까? => 방어코드. ts에서는 유효함!
    if (!socketRef || !stompClientRef) return;

    stompClientRef.current.connect({}, (recieve) => {
      subscriptionRef.current = stompClientRef.current?.subscribe(
        `/topic/notification/${userId}`,
        (message) => {
          console.log(":: 소켓이 작동합니다 ::");
          console.log(`:: message ::: ${message} ::`);
          const body = JSON.parse(message.body);
          console.log(`:: body ::: ${body} ::`);
          setNotifications((prev) => {
            // 실험해보고 false와 관련된 건 알아서 삭제하는 로직을 추가해보자! filter 메소드?
            return {
              ...prev,
              ...body,
            };
          });
        }
      );
    });

    return () => {
      subscriptionRef.current?.unsubscribe();
      stompClientRef.current?.disconnect();
    };
  }, []);

  const unsubscribe = useCallback(() => {
    subscriptionRef.current?.unsubscribe();
    stompClientRef.current?.disconnect();
  }, []);

  return {
    notifications,
    setNotifications,
    unsubscribe,
  };
};
