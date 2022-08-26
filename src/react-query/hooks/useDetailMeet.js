import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { meetsApi } from '../../shared/api';
import { queryKeys } from '../constants';

// 모임 상세 페이지
const getMeetPost = async (thunderPostId) => {
  try {
    const res = await meetsApi.getMeetDetail(thunderPostId);
    return res.data;
  } catch (error) {
    console.log(error.response);
  }
};

export function useDetailMeet(thunderPostId) {
  const [isLiked, setIsLiked] = useState();
  const [isJoined, setIsJoined] = useState();

  // 모임 상세 useQuery
  const { data: meet } = useQuery(
    [queryKeys.detailMeet, thunderPostId],
    () => getMeetPost(thunderPostId),
    {
      suspense: true
    }
  );

  // isLiked, setIsLiked, isJoined, setIsJoined
  return { meet, isLiked, setIsLiked, isJoined, setIsJoined };
}
