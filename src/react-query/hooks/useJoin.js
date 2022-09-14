import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';


const postJoin = async ({ setIsJoined, isJoined, thunderPostId }) => {
  if (isJoined) {
    try {
      const result = window.confirm('참가를 취소하시겠습니까?');
      if (result) {
        const res = await meetsApi.deleteRequest(thunderPostId);
        // alert('참가가 취소되었습니다');
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
        // alert('모임에 참가되었습니다');
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

  const queryClient = useQueryClient();

  const { mutate: onJoin } = useMutation(postJoin, {
    onSuccess: async() => {
      await queryClient.invalidateQueries([queryKeys.detailMeet]);
     await queryClient.invalidateQueries([queryKeys.myMeetsList]);
    },
    onError: () => {
    
    }
  });

  return onJoin;
}
