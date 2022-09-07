import { useCallback, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const socketServerURL = `http://${process.env.REACT_APP_API_SERVER}/socket`;

export const useNotification = (userId) => {
  const socketRef = useRef(null);
  const stompClientRef = useRef(null);
  const subscriptionRef = useRef(null);
  // 알림 뱃지가 있는지 state
  const [notifications, setNotifications] = useState({ isBadge: true });

  useEffect(() => {
    if (userId) {
      socketRef.current = new SockJS(socketServerURL);
      stompClientRef.current = Stomp.over(socketRef.current);

      stompClientRef.current.debug = () => {
        return;
      };

      if (!socketRef || !stompClientRef) return;

      stompClientRef.current.connect({}, (receipt) => {
        subscriptionRef.current = stompClientRef.current?.subscribe(
          `/topic/notification/${userId}`,
          (message) => {
            const body = JSON.parse(message.body);
            setNotifications((prev) => {
              const Body = {
                isBadge: body.badge,
              };
              return {
                ...prev,
                ...Body,
              };
            });
          }
        );
      });

      return () => {
        subscriptionRef.current?.unsubscribe();
        stompClientRef.current?.disconnect();
      };
    }
  }, [userId]);

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
