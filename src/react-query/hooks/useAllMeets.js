import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 모임 전체 게시글
const fetchMeetsList = async (pageParam, areaSelected, keyword) => {
  try {
    const res = await meetsApi.getSearchPosts(pageParam, areaSelected, keyword);
    console.log(res.data, 'res.data');
    const { content, last } = res.data;
    return { content, nextPage: pageParam + 1, last };
  } catch (error) {
    console.log('error.response');
  }
};

export function useAllMeets() {
  const [areaSelected, setAreaSelected] = useState('ALL');
  const [keyword, setKeyword] = useState('');

  // 모임 전체 게시글 useQuery
  const {
    data: thunderPosts,
    fetchNextPage,
    isFetchingNextPage
  } = useInfiniteQuery(
    [queryKeys.allMeets, keyword, areaSelected],
    ({ pageParam = 0 }) => fetchMeetsList(pageParam, areaSelected, keyword),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      suspense: true
    }
  );
  return {
    thunderPosts,
    areaSelected,
    setAreaSelected,
    setKeyword,
    isFetchingNextPage,
    fetchNextPage
  };
}
