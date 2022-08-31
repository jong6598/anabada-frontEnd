import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";
import { api } from "../shared/api";
import Navigate from "../layout/Navigate";
import NotificationCompo from "../components/NotificationCompo";
import { Link, useNavigate } from "react-router-dom";

const Notification = () => {
  // fetcher
  const getNotifications = async (pageParam) => {
    console.log("::: pagenation 요청 :::");
    // const res = await api.put(`/notifications?page=${pageParam}&size=10`);
    // console.log(`::: pagenation 요청결과 : ${res} :::`);
    // return {
    // data: res.data,
    // nextPage: pageParam + 1,
    // lastPage: res.data.last,
    // };
  };

  // useInfiniteQuery
  const { isSuccess, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["notifications"],
    ({ pageParam = 0 }) => getNotifications(pageParam),
    {
      getNextPageParam(currPage, allPages) {
        // if (!currPage.lastPage) {
        //   console.log("not last page");
        //   return currPage.nextPage;
        // }
        // return undefined;
      },
      onSuccess(data) {
        console.log("데이터를 성공적으로 fetch했습니다.");
      },
      onError(err) {
        console.log("데이터를 fetch에 실패했습니다.", err);
      },
      suspense: true,
    }
  );

  const handleIntersect = () => {};

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.8,
      root: null,
    });
    return () => {
      observer.disconnect();
    };
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <NotificationWrapper>
        <Navi onClick={() => navigate(-1)}>
          <svg
            width="9"
            height="14"
            viewBox="0 0 9 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.03033 13.5303C7.73744 13.8232 7.26256 13.8232 6.96967 13.5303L0.96967 7.53033C0.676777 7.23744 0.676777 6.76256 0.96967 6.46967L6.96967 0.46967C7.26256 0.176777 7.73744 0.176777 8.03033 0.46967C8.32322 0.762563 8.32322 1.23744 8.03033 1.53033L2.56066 7L8.03033 12.4697C8.32322 12.7626 8.32322 13.2374 8.03033 13.5303Z"
              fill="#1C1B1F"
            />
          </svg>
          <div>알림</div>
        </Navi>
        <NotificationContainer>
          <NotificationCompo />
          <NotificationCompo />
          <NotificationCompo />
        </NotificationContainer>
      </NotificationWrapper>
    </>
  );
};

export default Notification;

const NotificationWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Navi = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 0.8rem;

  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.6px;

  height: 3.25rem;
  font-weight: 700;
  font-size: 1.25rem;

  div {
    margin-left: 1rem;
  }
`;

const NotificationContainer = styled.div`
  box-sizing: border-box;
  margin: 1.25rem 1rem 2.5rem 1rem;
  background-color: antiquewhite;
`;
