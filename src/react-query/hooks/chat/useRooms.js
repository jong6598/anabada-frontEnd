import { useInfiniteQuery } from "@tanstack/react-query";
import { chatApi } from "../../../shared/api";
import { queryKeys } from "../../constants";
import { useSelector } from "react-redux";

// 검색 모임 게시글
const getRooms = async (pageParam) => {
  try {
    const res = await chatApi.getAllRooms(pageParam);
    const data = res.data.content;
    const last = res.data.last;
    return { data, nextPage: pageParam + 1, last };
  } catch (error) {
    console.log(error.response);
  }
};

export function useRooms() {
  const nickname = useSelector((state) => state.auth.nickname);

  // 모임 전체 게시글 useQuery
  const {
    data: rooms,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [queryKeys.rooms, nickname],
    ({ pageParam = 0 }) => getRooms(pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined,
    }
  );
  return {
    rooms,
    isFetchingNextPage,
    fetchNextPage,
  };
}
