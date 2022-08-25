import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../layout/useCustomToast';

const addMeetPost = async ({ isEdit, post, thunderPostId }) => {
  if (isEdit) {
    try {
      const res = await meetsApi.editMeetPost(post, thunderPostId);
      alert('모임이 수정되었습니다');
    } catch (error) {
      alert('수정에 실패하였습니다');
      console.log(error);
    }
  } else {
    try {
      const res = await meetsApi.postMeetPost(post);
      alert('모임이 등록되었습니다');
    } catch (error) {
      console.log(error);
      // FIXME:
      alert('모임 등록에 실패하였습니다');
    }
  }
};

export function useAddMeet() {
  const navigate = useNavigate();
  //FIXME: const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: onAdd } = useMutation(addMeetPost, {
    onSuccess: () => {
      // FIXME: 둘다 같은 키로 만들자?
      queryClient.invalidateQueries([queryKeys.meets]);
      queryClient.invalidateQueries([queryKeys.allMeets]);

      // TODO: 커스텀 토스트 만들기
      // const title = '성공적으로 모임이 등록되었습니다';
      // toast({ title, status: 'success' });
      navigate('/meets');
    },
    onError: () => {
      // const title = '모임 등록에 실패하였습니다';
      // toast({ title, status: 'error' });
    }
  });

  return onAdd;
}
