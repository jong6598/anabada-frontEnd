import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { chatApi, meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 모임 전체 게시글
const fetchMeetsList = async (pageParam, roomId) => {
  try {
    const res = await chatApi.getMessages(roomId);
    const data = res.data.content;
    const last = res.data.last;
    return { data, nextPage: pageParam + 1, last };
  } catch (error) {
    console.log('error.response');
  }
};

export function useMessages(roomId) {
  // 모임 전체 게시글 useQuery
  const {
    data: messages,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    [queryKeys.messages],
    ({ pageParam = 0 }) => fetchMeetsList(pageParam, roomId),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      suspense: true
    }
  );
  return {
    messages,
    isFetchingNextPage,
    fetchNextPage
  };
}
