import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 모임 상세 페이지
const getMeetPost = async () => {
  try {
    const res = await meetsApi.getMeetDetail();
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export function useDetailMeet() {
  const [isLiked, setIsLiked] = useState();
  const [isJoined, setIsJoined] = useState();

  // 모임 상세 useQuery
  const { data: meet } = useQuery([queryKeys.detailMeet], getMeetPost, {
    suspense: true
  });
  return { meet, isLiked, setIsLiked, isJoined, setIsJoined };
}
