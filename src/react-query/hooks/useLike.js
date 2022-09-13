import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../layout/useCustomToast';

const postLike = async ({ setIsLiked, isLiked, thunderPostId }) => {
  if (isLiked) {
    try {
      const res = await meetsApi.deleteLike(thunderPostId);
      // alert('북마크가 취소되었습니다');
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await meetsApi.postLike(thunderPostId);
      setIsLiked((prev) => !prev);
      // alert('북마크에 저장되었습니다');
    } catch (error) {
      console.log(error);
      alert('북마크 저장에 실패하였습니다');
    }
  }
};

export function useLike(isLiked) {
  const navigate = useNavigate();
  //FIXME: const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: onLike } = useMutation(postLike, {
    onSuccess: () => {
      // FIXME: 둘다 같은 키로 만들자?
      queryClient.invalidateQueries([queryKeys.detailMeet]);

      // TODO: 커스텀 토스트 만들기
      // const title = '성공적으로 모임이 등록되었습니다';
      // toast({ title, status: 'success' });
    },
    onError: () => {
      // const title = '모임 등록에 실패하였습니다';
      // toast({ title, status: 'error' });
    }
  });

  return onLike;
}
