import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { useState } from 'react';
import { meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 모임 전체 게시글
const fetchMeetsList = async (pageParam, areaSelected) => {
  try {
    const res = await meetsApi.getMeetsPosts(pageParam, areaSelected);
    const data = res.data.content;
    const last = res.data.last;
    return { data, nextPage: pageParam + 1, last };
  } catch (error) {
    console.log('error.response');
  }
};

export function useAllMeets() {
  const [areaSelected, setAreaSelected] = useState('ALL');
  const [isSearch, setIsSearch] = useState(true);

  // 모임 전체 게시글 useQuery
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.allMeets, areaSelected],
    ({ pageParam = 0 }) => fetchMeetsList(pageParam, areaSelected),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      suspense: true,
      enabled: isSearch
    }
  );
  return {
    data,
    areaSelected,
    setAreaSelected,
    setIsSearch,
    isFetchingNextPage,
    fetchNextPage
  };
}
