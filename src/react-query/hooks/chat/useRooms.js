import React, { useState } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { chatApi } from '../../../shared/api';
import { queryKeys } from '../../constants';

// 검색 모임 게시글
const getRooms = async (pageParam) => {
  try {
    const res = await chatApi.getAllRooms(pageParam);
    console.log(res.data, 'res.data');
    const data = res.data.content;
    const last = res.data.last;
    return { data, nextPage: pageParam + 1, last };
  } catch (error) {
    console.log(error.response);
  }
};

export function useRooms() {
  // 모임 전체 게시글 useQuery
  const {
    data: rooms,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    [queryKeys.rooms],
    ({ pageParam = 0 }) => getRooms(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined
    }
  );
  return {
    rooms,
    isFetchingNextPage,
    fetchNextPage
  };
}
