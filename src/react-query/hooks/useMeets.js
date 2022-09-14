import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 모임 게시글
const fetchMeetsList = async (pageParam, areaSelected) => {
  try {
    const res = await meetsApi.getMeetsPosts(pageParam, areaSelected);

    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export function useMeets() {
  const [areaSelected, setAreaSelected] = useState('ALL');

  // 모임 게시글 useQuery
  const { data: meetsPosts } = useQuery(
    [queryKeys.meets, areaSelected],
    ({ pageParam = 0 }) => fetchMeetsList(pageParam, areaSelected),
    {
      suspense: true
    }
  );
  return { meetsPosts, areaSelected, setAreaSelected };
}
