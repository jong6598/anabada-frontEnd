import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { meetsApi } from "../../shared/api";
import { useNavigate } from "react-router-dom";

const deleteMeetPost = async (thunderPostId) => {
  try {
    await meetsApi.deleteMeetPost(thunderPostId);
  } catch (error) {
    console.log(error);
  }
};

export function useAddMeet() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: onDelete } = useMutation(deleteMeetPost, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.meets]);
      queryClient.invalidateQueries([queryKeys.allMeets]);
      navigate("/meets");
    },
    onError: () => {
      alert("모임 삭제에 실패하였습니다");
    },
  });

  return onDelete;
}
