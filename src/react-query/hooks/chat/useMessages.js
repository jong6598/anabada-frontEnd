import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { chatApi, meetsApi } from '../../../shared/api';
import { queryKeys } from '../../constants';

// 모임 전체 게시글
const fetchMessages = async (pageParam, __roomId) => {
  try {
    const res = await chatApi.getMessages(pageParam, __roomId);
    const data = res.data.content;
    const last = res.data.last;
    const first = res.data.fist;

    return { data, nextPage: pageParam + 1, last };
  } catch (error) {
    console.log('error.response');
  }
};

export function useMessages() {
  const [__roomId, __setRoomId] = useState(null);

  const {
    data: messages,
    fetchNextPage,
    // fetchPreviousPage,
    // isFetchingPreviousPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    [queryKeys.messages, __roomId],
    ({ pageParam = 0 }) => fetchMessages(pageParam, __roomId),
    {
      select: (data) => ({
        pages: [...data.pages].reverse()
      }),
      // getPreviousPageParam: (firstPage) =>
      //   !firstPage.first ? firstPage.prevPage : undefined,
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      enabled: !!__roomId
    }
  );
  return { messages, __setRoomId, isFetchingNextPage, fetchNextPage };
}
