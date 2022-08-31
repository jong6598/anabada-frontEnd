import styled from "styled-components";

const NotificationCompo = ({ notiType, notiUser, notiPost }) => {
  return (
    <>
      <NotiWrapper>
        <NotiContainer>
          {notiType === "like" ? (
            <NotiType>
              <img src="/assets/noti_isliked.svg"></img>
            </NotiType>
          ) : (
            <NotiType>
              <img src="/assets/noti_message.svg"></img>
            </NotiType>
          )}

          <NotiInfo>
            {notiType === "like" ? (
              <NotiWho>{`${notiUser?.nickname}님이 좋아요를 했습니다.`}</NotiWho>
            ) : (
              <NotiWho>{`${notiUser?.nickname}님이 댓글을 남겼습니다.`}</NotiWho>
            )}
            <NotiWhat>{`${notiPost?.title}`}</NotiWhat>
          </NotiInfo>
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

  background-color: yellowgreen;
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

  background-color: coral;

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
`;

const NotiWhat = styled.div`
  font-weight: 500;
  font-size: 0.75rem;
  color: #8e8e93;
  width: 100%;
`;
