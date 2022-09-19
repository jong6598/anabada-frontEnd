import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { meetsApi } from '../../../shared/api';
import { queryKeys } from '../../constants';

const fetchPosts = async (pageParam, areaSelected, search) => {
  if (search) {
    try {
      const res = await meetsApi.getSearchPosts(
        pageParam,
        areaSelected,
        search
      );

      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (error) {
      console.log(error.response);
    }
  } else {
    try {
      const res = await meetsApi.getMeetsPosts(pageParam, areaSelected);
      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (error) {
      console.log(error.response);
    }
  }
};

export function useAllMeets() {
  const [areaSelected, setAreaSelected] = useState('ALL');
  const [search, setSearch] = useState(null);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.allMeets, areaSelected, search],
    ({ pageParam = 0 }) => fetchPosts(pageParam, areaSelected, search),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined
    }
  );

  return {
    data,
    fetchNextPage,
    isFetchingNextPage,
    setSearch,
    setAreaSelected,
    areaSelected
  };
}
