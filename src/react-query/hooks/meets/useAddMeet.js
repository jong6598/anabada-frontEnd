import { useQueryClient, useMutation } from '@tanstack/react-query';
import { meetsApi } from '../../../shared/api';
import { queryKeys } from '../../constants';
import { useNavigate } from 'react-router-dom';

const onSubmitMeet = async ({ newMeet, thunderPostId }) => {
  if (!thunderPostId) {
    try {
      await meetsApi.postMeetPost(newMeet);
    } catch (err) {
      alert('모임 등록에 실패하였습니다');
    }
  } else {
    try {
      await meetsApi.editMeetPost(thunderPostId, newMeet);
    } catch (err) {
      console.log(err);
      alert('모임 수정에 실패하였습니다');
    }
  }
};

export function useAddMeet() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: onAdd } = useMutation(onSubmitMeet, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.meets]);
      queryClient.invalidateQueries([queryKeys.allMeets]);
      navigate(`/meets`);
    },
    onError: (err) => {
      console.log(err.respose);
      alert('모임 등록에 실패하였습니다');
    }
  });

  return onAdd;
}
