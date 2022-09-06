import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../layout/useCustomToast';

const deleteMeetPost = async (thunderPostId) => {
  try {
    const res = await meetsApi.deleteMeetPost(thunderPostId);
  } catch (error) {
    console.log(error);
  }
};

export function useAddMeet() {
  const navigate = useNavigate();
  //FIXME: const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation(deleteMeetPost, {
    onSuccess: () => {
      // FIXME: 둘다 같은 키로 하면?
      queryClient.invalidateQueries([queryKeys.meets]);
      queryClient.invalidateQueries([queryKeys.allMeets]);
      alert('모임이 삭제되었습니다');
 
      navigate('/meets');
    },
    onError: () => {
      alert('모임 삭제에 실패하였습니다');
      // const title = '모임 삭제에 실패하였습니다';
      // toast({ title, status: 'error' });
    }
  });

  return onDelete;
}
