import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';
import { useCustomToast } from '../../layout/useCustomToast';

const addMeetPost = async (post) => {
  try {
    const res = await meetsApi.postMeetPost(post);
  } catch (error) {
    console.log(error);
  }
};

export function useAddMeet() {
  const navigate = useNavigate();
  const toast = useCustomToast();
  const queryClient = useQueryClient();

  const { mutate: onAdd } = useMutation(addMeetPost, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.meets]);
      const title = '성공적으로 모임이 등록되었습니다';
      toast({ title, status: 'success' });
      navigate(-1);
    },
    onError: () => {
      const title = '모임 등록에 실패하였습니다';
      toast({ title, status: 'error' });
    }
  });

  return onAdd;
}
