import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import { postApi } from '../../../shared/api';
import { queryKeys } from '../../constants';

// 모임 게시글
const fetchPosts = async (pageParam, areaSelected) => {
  // console.log(search, '🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈');
  // if (search) {
  //   try {
  //     console.log(search, 'search 들어와잇냐?');
  //     const res = await postApi.getSearchPosts(
  //       areaSelected,
  //       search,
  //       pageParam
  //     );
  //     const data = res.data.content;
  //     const last = res.data.last;
  //     return { data, nextPage: pageParam + 1, last };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // } else {
  try {
    console.log('search 없이 요청');
    const res = await postApi.getPosts(pageParam, areaSelected);
    const data = res.data.content;
    const last = res.data.last;
    return { data, nextPage: pageParam + 1, last };
  } catch (err) {
    console.log(err);
    alert(err);
  }
  // }
};

export function usePosts() {
  const [areaSelected, setAreaSelected] = useState('ALL');
  const [search, setSearch] = useState(null);

  // 모임 게시글 useQuery
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.posts, areaSelected],
    ({ pageParam = 0 }) => fetchPosts(pageParam, areaSelected),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
      suspense: true
    }
  );
  return {
    data,
    fetchNextPage,
    isFetchingNextPage,
    areaSelected,
    setAreaSelected,
    setSearch
  };
}
