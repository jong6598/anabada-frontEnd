import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../constants';
import { postApi } from '../../../shared/api';
import { useNavigate } from 'react-router-dom';

const onSubmitPost = async ({ newPost, postId }) => {
  if (!postId) {
    try {
      const post = await postApi.newPost(newPost);
      alert('게시글이 등록되었습니다!');
    } catch (err) {
      alert(err);
    }
  } else {
    try {
      const update = await postApi.updatePost(postId, newPost);
      alert('게시글이 수정되었습니다!');
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
};

export function useAddPost() {
  const navigate = useNavigate();

  const queryClient = new useQueryClient();

  const { mutate: onAdd } = useMutation(onSubmitPost, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.posts]);
      navigate('/posts');
    },
    onError: (err) => {
      console.log(err.respose);
      alert('게시글 등록에 실패하였습니다');
    }
  });

  return onAdd;
}
