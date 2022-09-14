import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';

const postLike = async ({ setIsLiked, isLiked, thunderPostId }) => {
  if (isLiked) {
    try {
      const res = await meetsApi.deleteLike(thunderPostId);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await meetsApi.postLike(thunderPostId);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
      alert('북마크 저장에 실패하였습니다');
    }
  }
};

export function useLike() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: onLike } = useMutation(postLike, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.detailMeet]);
      queryClient.invalidateQueries([queryKeys.myMeetsList], {
        refetchType: 'all'
      });
    },
    onError: (error) => {
      console.log(error);
    }
  });

  return onLike;
}
