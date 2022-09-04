import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { chatApi, meetsApi } from '../../../shared/api';
import { queryKeys } from '../../constants';

// 모임 전체 게시글
const fetchMessages = async (pageParam, __roomId) => {
  console.log(__roomId, 'roomId 들어오는지 체크');
  try {
    const res = await chatApi.getMessages(__roomId);
    return res.data;
  } catch (error) {
    console.log('error.response');
  }
};

export function useMessages() {
  const [__roomId, __setRoomId] = useState(null);
  console.log(__roomId, 'roomId 값 체크해보자');
  const {
    data: messages,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    [queryKeys.messages, __roomId],
    ({ pageParam = 0 }) => fetchMessages(pageParam, __roomId),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      enabled: !!__roomId
    }
  );
  return { messages, __setRoomId, isFetchingNextPage, fetchNextPage };
}

// export function useMessages(roomId) {
//   // 모임 전체 게시글 useQuery
//   const {
//     data: messages,
//     fetchNextPage,
//     isFetchingNextPage
//   } = useInfiniteQuery(
//     [queryKeys.messages],
//     ({ pageParam = 0 }) => fetchMeetsList(pageParam, roomId),
//     {
//       getNextPageParam: (lastPage) =>
//         !lastPage.last ? lastPage.nextPage : undefined,
//       suspense: true
//     }
//   );
//   return {
//     messages,
//     isFetchingNextPage,
//     fetchNextPage
//   };
// }
