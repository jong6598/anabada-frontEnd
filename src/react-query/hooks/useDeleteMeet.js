import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { meetsApi } from '../../shared/api';
import { useNavigate } from 'react-router-dom';

const deleteMeetPost = async (thunderPostId) => {
  try {
    const res = await meetsApi.deleteMeetPost(thunderPostId);
  } catch (error) {
    console.log(error);
  }
};

export function useAddMeet() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation(deleteMeetPost, {
    onSuccess: () => {
      // FIXME: 둘다 같은 키로 하면?
      queryClient.invalidateQueries([queryKeys.meets]);
      queryClient.invalidateQueries([queryKeys.allMeets]);
      // alert('모임이 삭제되었습니다');

      navigate('/meets');
    },
    onError: () => {
      alert('모임 삭제에 실패하였습니다');
    }
  });

  return onDelete;
}
