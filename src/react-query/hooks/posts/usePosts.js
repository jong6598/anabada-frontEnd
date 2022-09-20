import { useQueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from '../../constants';
import { postApi } from '../../../shared/api';
import { useState } from 'react';

const fetchPosts = async (pageParam, areaSelected, search) => {
  if (search) {
    try {
      const res = await postApi.getSearchPosts(pageParam, areaSelected, search);

      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const res = await postApi.getPosts(pageParam, areaSelected);
      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
};

export function usePosts() {
  const [areaSelected, setAreaSelected] = useState('ALL');
  const [search, setSearch] = useState(null);

  const { data, fetchNextPage, isFetchingNextPage, isFetching, isLoading } =
    useInfiniteQuery(
      [queryKeys.posts, areaSelected, search],
      ({ pageParam = 0 }) => fetchPosts(pageParam, areaSelected, search),
      {
        getNextPageParam: (lastPage) =>
          !lastPage.last ? lastPage.nextPage : undefined,
        refetchOnWindowFocus: false,
        staleTime: 600000
      }
    );

  return {
    data,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    isLoading,
    setSearch,
    areaSelected,
    setAreaSelected
  };
}

export function usePreFetchPosts() {
  const queryClient = useQueryClient();

  // eslint-disable-next-line no-unused-vars
  const [areaSelected, setAreaSelected] = useState('ALL');
  // eslint-disable-next-line no-unused-vars
  const [search, setSearch] = useState(null);

  queryClient.prefetchInfiniteQuery(
    [queryKeys.posts, areaSelected, search],
    ({ pageParam = 0 }) => fetchPosts(pageParam, areaSelected, search),
    {
      staleTime: 600000
    }
  );
}
