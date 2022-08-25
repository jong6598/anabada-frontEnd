import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../layout/useCustomToast';

const postJoin = async (isJoined, thunderPostId) => {
  if (isJoined) {
    try {
      const res = await meetsApi.deleteRequest(thunderPostId);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const res = await meetsApi.postRequest(thunderPostId);
    } catch (error) {
      console.log(error);
    }
  }
};

export function useJoin() {
  const navigate = useNavigate();
  //FIXME: const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: onJoin } = useMutation(
    (isJoined, thunderPostId) => postJoin(isJoined, thunderPostId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.detailMeet]);

        // TODO: 커스텀 토스트 만들기 alert 대신 출력
        // const title = '성공적으로 모임이 등록되었습니다';
        // toast({ title, status: 'success' });
        alert('모임에 참여하였습니다');
        navigate('/meets');
      },
      onError: () => {
        alert('모임에 참여에 실패하였습니다');
        // const title = '모임 등록에 실패하였습니다';
        // toast({ title, status: 'error' });
      }
    }
  );

  return onJoin;
}
