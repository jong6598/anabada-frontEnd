import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { api } from '../shared/api';
import NotificationCompo from '../components/NotificationCompo';
import { useNavigate } from 'react-router-dom';
import { queryKeys } from '../react-query/constants';
import Navigate from '../layout/Navigate';

const Notification = ({ setNotifications }) => {
  const lastNotiRef = useRef();
  const navigate = useNavigate();
  // fetcher
  const getNotifications = async (pageParam) => {
    const res = await api.patch(`/notifications?page=${pageParam}&size=10`);
    return {
      data: res.data,
      nextPage: pageParam + 1,
      lastPage: res.data.last
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
        return console.log('데이터를 fetch에 실패했습니다.', err);
      },
      suspense: true
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
      root: null
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
    }
  });

  const handleAllDelete = () => {
    const res = window.confirm('전체 알림을 삭제하시겠습니까?');
    if (res) {
      return mutation.mutate();
    }
  };

  return (
    <Container>
      <NotificationWrapper>
        <Navigate text={'알림'} />
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
    </Container>
  );
};

export default Notification;

const Container = styled.div`
  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    width: 40vw;
  }
`;

const NotificationWrapper = styled.div``;

const NotificationContainer = styled.div`
  box-sizing: border-box;
  padding: 1rem 0;
  /* margin: 1.25rem 1rem 2.5rem 1rem; */
  /* padding-top: 3.5rem; */
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
