import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../constants";
import { postApi } from "../../../shared/api";
import { useNavigate } from "react-router-dom";

const onSubmitPost = async ({ newPost, postId }) => {
  if (!postId) {
    try {
      await postApi.newPost(newPost);
    } catch (err) {
      alert(err);
    }
  } else {
    try {
      await postApi.updatePost(postId, newPost);
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
      navigate("/posts");
    },
    onError: (err) => {
      console.log(err.respose);
      alert("게시글 등록에 실패하였습니다");
    },
  });

  return onAdd;
}
