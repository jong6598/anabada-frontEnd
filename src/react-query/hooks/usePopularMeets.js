import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 인기 모임 게시글
const fetchPopularList = async (area) => {
  try {
    const res = await meetsApi.getPopularPosts(area);
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export function usePopularMeets() {
  const [areaSelected, setPopularAreaSelected] = useState('ALL');

  // 인기 게시글 useQuery
  const { data: popularPosts } = useQuery(
    [queryKeys.popularMeets, areaSelected],
    () => fetchPopularList(areaSelected),
    {
      suspense: true
    }
  );

  return { popularPosts, areaSelected, setPopularAreaSelected };
}
