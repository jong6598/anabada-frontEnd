import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
// import { useCustomToast } from '../../layout/useCustomToast';

const postJoin = async ({ setIsJoined, isJoined, thunderPostId }) => {
  if (isJoined) {
    try {
      const result = window.confirm('참가를 취소하시겠습니까?');
      if (result) {
        const res = await meetsApi.deleteRequest(thunderPostId);
        alert('참가가 취소되었습니다');
        setIsJoined((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const result = window.confirm('모임에 참가하시겠습니까?');
      if (result) {
        const res = await meetsApi.postRequest(thunderPostId);
        alert('모임에 참가되었습니다');
        setIsJoined((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
      alert('모임에 참가에 실패하였습니다');
    }
  }
};

export function useJoin() {
  const navigate = useNavigate();
  //FIXME: const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: onJoin } = useMutation(postJoin, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.detailMeet]);

      // TODO: 커스텀 토스트 만들기 alert 대신 출력
      // const title = '성공적으로 모임이 등록되었습니다';
      // toast({ title, status: 'success' });
    },
    onError: () => {
      // const title = '모임 등록에 실패하였습니다';
      // toast({ title, status: 'error' });
    }
  });

  return onJoin;
}
