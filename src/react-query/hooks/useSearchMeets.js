import React, { useState } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 검색 모임 게시글
const fetchSearchList = async (pageParam, area, keyword) => {
  try {
    const res = await meetsApi.getSearchPosts(pageParam, area, keyword);
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export function useSearchMeets() {
  const [areaSelectedSearch, setAreaSelectedSearch] = useState('ALL');
  const [keyword, setKeyword] = useState('');

  // 모임 전체 게시글 useQuery
  const {
    data: searchPosts,
    fetchNextPage: fetchNextPageSearch,
    isFetchingNextPage: isFetchingNextPageSearch
  } = useInfiniteQuery(
    [queryKeys.searchMeets, areaSelectedSearch, keyword],
    ({ pageParam = 0 }) =>
      fetchSearchList(pageParam, areaSelectedSearch, keyword),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      suspense: true,
      enabled: !!keyword
    }
  );
  return {
    searchPosts,
    areaSelectedSearch,
    setAreaSelectedSearch,
    setKeyword,
    isFetchingNextPageSearch,
    fetchNextPageSearch
  };
}
