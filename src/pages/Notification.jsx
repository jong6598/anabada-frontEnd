import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { api } from "../shared/api";
import NotificationCompo from "../components/NotificationCompo";
import { useNavigate } from "react-router-dom";
import { queryKeys } from "../react-query/constants";

const Notification = ({ setNotifications }) => {
  const lastNotiRef = useRef();
  const navigate = useNavigate();
  // fetcher
  const getNotifications = async (pageParam) => {
    const res = await api.patch(`/notifications?page=${pageParam}&size=10`);
    return {
      data: res.data,
      nextPage: pageParam + 1,
      lastPage: res.data.last,
    };
  };

  // useInfiniteQuery
  const { isSuccess, data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    [queryKeys.notifications],
    ({ pageParam = 0 }) => getNotifications(pageParam),
    {
      getNextPageParam(currPage, allPages) {
        if (!currPage.lastPage) {
          return currPage.nextPage;
        }
        return undefined;
      },
      onError(err) {
        return console.log("데이터를 fetch에 실패했습니다.", err);
      },
      suspense: true,
    }
  );

  const handleIntersect = useCallback(
    ([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    setNotifications((prev) => {
      return { ...prev, isBadge: true };
    });
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.8,
      root: null,
    });
    lastNotiRef.current && observer.observe(lastNotiRef.current);
    return () => {
      observer.disconnect();
    };
  }, [handleIntersect, data]);

  // 전체 삭제 버튼 눌렀을 때 mutation
  const queryClient = new useQueryClient();

  const handleAllDeleteMutation = async () => {
    try {
      return await api.delete(`/notifications`);
    } catch (err) {
      // alertHandler("서버와 통신이 불안정 합니다. 다시 시도해주세요.");
      return console.log(err);
    }
  };

  const mutation = new useMutation(handleAllDeleteMutation, {
    onSuccess() {
      return queryClient.invalidateQueries([queryKeys.notifications]);
    },
  });

  const handleAllDelete = () => {
    const res = window.confirm("전체 알림을 삭제하시겠습니까?");
    if (res) {
      return mutation.mutate();
    }
  };

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
          {isSuccess &&
            data.pages.map((page, pageIndex) => {
              const content = page.data.content;
              return content?.map((noti, notiIndex) => {
                if (
                  notiIndex === content.length - 1 &&
                  pageIndex === data.pages.length - 1 &&
                  hasNextPage
                ) {
                  return (
                    <NotificationCompo
                      key={noti.notificationId}
                      refValue={lastNotiRef}
                      {...noti}
                    />
                  );
                } else {
                  return (
                    <NotificationCompo key={noti.notificationId} {...noti} />
                  );
                }
              });
            })}
        </NotificationContainer>
        <NotiAllDelete onClick={handleAllDelete}>
          <span className="material-symbols-outlined">delete</span>
        </NotiAllDelete>
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

  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
`;

const NotificationContainer = styled.div`
  box-sizing: border-box;
  margin: 1.25rem 1rem 2.5rem 1rem;
  padding-top: 3.5rem;
`;

const NotiAllDelete = styled.div`
  position: fixed;
  z-index: 300;
  bottom: 8rem;
  right: 3rem;

  width: 3rem;
  height: 3rem;

  background-color: #007aff;
  opacity: 0.9;
  border-radius: 100rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;
