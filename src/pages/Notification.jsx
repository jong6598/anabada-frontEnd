import { async } from "@firebase/util";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { api } from "../shared/api";
const Notification = () => {
  // fetcher
  const getNotifications = async (pageParam) => {
    console.log("::: pagenation 요청 :::");
    const res = await api.put(`/notifications?page=${pageParam}&size=10`);
    console.log(`::: pagenation 요청결과 : ${res} :::`);
    return {
      data: res.data,
      nextPage: pageParam + 1,
      lastPage: res.data.last,
    };
  };

  // useInfiniteQuery
  const {} = useInfiniteQuery(
    ["notifications"],
    ({ pageParam = 0 }) => getNotifications(pageParam),
    {}
  );

  // ..?
  useEffect(() => {
    api.put();
  }, []);
  return (
    <>
      <NotificationContainer></NotificationContainer>
    </>
  );
};

export default Notification;

const NotificationContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;
