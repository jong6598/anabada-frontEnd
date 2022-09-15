import { useMutation, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import { api } from "../../shared/api";
import { queryKeys } from "../../react-query/constants";
import { useNavigate } from "react-router-dom";

const NotificationCompo = ({
  notificationType,
  notificationId,
  post,
  user,
  read,
  refValue,
}) => {
  // 삭제 버튼 눌렀을 때 mutation
  const navigate = useNavigate();
  const queryClient = new useQueryClient();

  const handleDeleteMutation = async (notificationId) => {
    try {
      return await api.delete(`notifications/${notificationId}`);
    } catch (err) {
      return console.log(err);
    }
  };

  const mutation = useMutation(handleDeleteMutation, {
    onSuccess() {
      return queryClient.invalidateQueries([queryKeys.notifications]);
    },
  });

  const handleDelete = () => {
    return mutation.mutate(notificationId);
  };

  const handleNotiWrapper = async () => {
    await api.put(`notifications/${notificationId}`);
    return navigate(`/posts/${post.postId}`);
  };

  return (
    <>
      <NotiWrapper ref={refValue}>
        <NotiContainer>
          {notificationType === "like" ? (
            <NotiType>
              <img src="/assets/noti_isliked.svg" alt=""></img>
            </NotiType>
          ) : (
            <NotiType>
              <img src="/assets/noti_message.svg" alt=""></img>
            </NotiType>
          )}

          <NotiInfo onClick={handleNotiWrapper}>
            {notificationType === "like" ? (
              <NotiWho
                isRead={read}
              >{`${user?.nickname}님이 좋아요를 했습니다.`}</NotiWho>
            ) : (
              <NotiWho
                isRead={read}
              >{`${user?.nickname}님이 댓글을 남겼습니다.`}</NotiWho>
            )}
            <NotiWhat>{`${post?.title}`}</NotiWhat>
          </NotiInfo>
          <NotiDel onClick={handleDelete}>
            <span className="material-symbols-outlined">close</span>
          </NotiDel>
        </NotiContainer>
      </NotiWrapper>
    </>
  );
};

export default NotificationCompo;

const NotiWrapper = styled.div`
  width: 100%;
  height: 3.8125rem;
  margin-bottom: 0.625rem;

  padding: 0.625rem 0.8125rem;

  box-shadow: 1px 1px 8px rgba(198, 198, 198, 0.42);
  border-radius: 6px;
  cursor: pointer;
`;

const NotiContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const NotiType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  padding-bottom: 1rem;
`;
const NotiInfo = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  display: block; /* 블록태그로 만들어준다 */
  overflow: hidden;
  * > div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const NotiWho = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  width: 100%;
  color: ${(props) => (props.isRead ? "#8e8e93" : "black")};
`;

const NotiWhat = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  color: #8e8e93;
  width: 100%;
`;

const NotiDel = styled.div``;
