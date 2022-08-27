import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { meetsApi } from '../shared/api';
import { useQuery } from '@tanstack/react-query';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
// import { meet } from '../shared/data';
import { useDetailMeet } from '../react-query/hooks/useDetailMeet';
import { useSelector } from 'react-redux';
import { useAddMeet } from '../react-query/hooks/useDeleteMeet';
import { useLike } from '../react-query/hooks/useLike';
import { useJoin } from '../react-query/hooks/useJoin';

const MeetDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { meet, isLiked, setIsLiked, isJoined, setIsJoined } = useDetailMeet(
    params.thunderPostId
  );
  const onDelete = useAddMeet();
  const onLike = useLike();
  const onJoin = useJoin(isJoined);

  // initial like, join state 값 설정
  useEffect(() => {
    if (meet) {
      setIsLiked(meet.liked);
      setIsJoined(meet.joined);
    }
  }, [isLiked, isJoined]);

  const nickname = useSelector((state) => state.auth.nickname);

  // FIXME:
  // const onLike = (thunderPostId) => {
  //   if (isLiked) {
  //     meetsApi.deleteLike(thunderPostId);
  //   } else {
  //     meetsApi.postLike(thunderPostId);
  //   }
  //   setIsLiked((prev) => !prev);
  // };

  // const onRequest = (thunderPostId) => {
  //   if (isJoined) {
  //     meetsApi.deleteRequest(thunderPostId);
  //   } else {
  //     meetsApi.postRequest(thunderPostId);
  //   }
  //   setIsJoined((prev) => !prev);
  // };

  const onShowModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <Container>
      <div className="postTopInfo">
        <p className="title">{meet.title}</p>
        <div className="postUserInfoContainer">
          <div className="postUserInfo">
            <img src={meet.profileUrl} alt="profileUrl" />
            <p className="nickname">{meet.nickname}</p>
            <svg
              width="2"
              height="10"
              viewBox="0 0 2 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1V9" stroke="#C7C7CC" stroke-linecap="round" />
            </svg>
            <p>{meet.createdAt}</p>
            <svg
              width="2"
              height="10"
              viewBox="0 0 2 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1V9" stroke="#C7C7CC" stroke-linecap="round" />
            </svg>
            <p>조회 {meet.viewCount}</p>
          </div>
          {nickname === meet.nickname && (
            <button className="moreBtn" onClick={onShowModal}>
              <FiMoreHorizontal />
            </button>
          )}
          {showModal && (
            <SelectContainer>
              <div
                className="editBtn"
                onClick={() => {
                  navigate('/meetAdd', { state: meet });
                }}
              >
                수정하기
                <FiEdit2 />
              </div>
              <div
                className="deleteBtn"
                onClick={() => {
                  const result = window.confirm('정말 삭제하시겠습니까?');
                  if (result) {
                    onDelete(meet.thunderPostId);
                    navigate('/meets');
                  }
                }}
              >
                삭제하기
                <RiDeleteBin5Line />
              </div>
            </SelectContainer>
          )}
        </div>
      </div>
      <ImageWrapper>
        <img src={meet.thumbnailUrl} alt="thumbnail" />
      </ImageWrapper>
      <AddressContainer>
        <svg
          width="12"
          height="16"
          viewBox="0 0 12 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.5 6.33301C0.5 3.29543 2.96242 0.833008 6 0.833008C9.03758 0.833008 11.5 3.29543 11.5 6.33301C11.5 8.67687 10.1577 10.8741 8.88838 12.4396C8.24605 13.2318 7.60492 13.8835 7.12456 14.3371C6.88407 14.5643 6.68307 14.7425 6.54128 14.8647C6.47036 14.9259 6.41419 14.973 6.37523 15.0053C6.35575 15.0215 6.34057 15.0339 6.32998 15.0425L6.3176 15.0526L6.31407 15.0554L6.31298 15.0563L6.31261 15.0566C6.31247 15.0567 6.31235 15.0568 6 14.6663C5.68765 15.0568 5.68753 15.0567 5.68739 15.0566L5.68702 15.0563L5.68593 15.0554L5.6824 15.0526L5.67002 15.0425C5.65943 15.0339 5.64425 15.0215 5.62477 15.0053C5.58581 14.973 5.52964 14.9259 5.45872 14.8647C5.31693 14.7425 5.11593 14.5643 4.87544 14.3371C4.39508 13.8835 3.75396 13.2318 3.11162 12.4396C1.84231 10.8741 0.5 8.67687 0.5 6.33301ZM6 14.6663L5.68765 15.0568C5.87026 15.2029 6.12974 15.2029 6.31235 15.0568L6 14.6663ZM6 14.01C6.11918 13.9051 6.26783 13.7708 6.43794 13.6101C6.89508 13.1784 7.50396 12.5592 8.11162 11.8098C9.34231 10.2919 10.5 8.32248 10.5 6.33301C10.5 3.84772 8.48529 1.83301 6 1.83301C3.51471 1.83301 1.5 3.84772 1.5 6.33301C1.5 8.32248 2.65769 10.2919 3.88838 11.8098C4.49604 12.5592 5.10492 13.1784 5.56206 13.6101C5.73217 13.7708 5.88081 13.9051 6 14.01Z"
            fill="#007AFF"
          />
        </svg>
        <p>
          {meet.area} {meet.address}
        </p>
      </AddressContainer>
      <PostDetailInfo>
        <h2>모집 정보</h2>
        <div className="meetInfo">
          <div>
            <img src={'/assets/wave.png'} alt="" />
            <p>
              인원 {meet.currentMember} / {meet.goalMember}
            </p>
          </div>
          <div>
            <img src={'/assets/wave.png'} alt="" />
            <p>모임 날짜</p>
            <p>{meet.meetDate}</p>
          </div>
          <div>
            <img src={'/assets/wave.png'} alt="" />
            <p>모임 기간</p>
            <p>
              {meet.startDate} ~ {meet.endDate}
            </p>
          </div>
        </div>
      </PostDetailInfo>
      <PostDescription>{meet.content}</PostDescription>
      {/* FIXME: !===으로 바꿔야함 */}
      {nickname === meet.nickname && (
        <ButtonContainer>
          <button
            className="likeBtn"
            isLiked={isLiked}
            onClick={() => {
              const state = {
                setIsLiked,
                isLiked,
                thunderPostId: meet.thunderPostId
              };
              onLike(state);
            }}
          >
            {!isLiked && (
              <svg
                width="17"
                height="15"
                viewBox="0 0 17 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.4375 5.125C0.4375 2.53618 2.53617 0.4375 5.125 0.4375C6.45079 0.4375 7.64792 0.988282 8.5 1.87203C9.35208 0.988282 10.5492 0.4375 11.875 0.4375C14.4638 0.4375 16.5625 2.53618 16.5625 5.125C16.5625 7.40357 15.2251 9.50746 13.6341 11.1142C12.0376 12.7265 10.0893 13.9369 8.67739 14.4061C8.56223 14.4444 8.43777 14.4444 8.32261 14.4061C6.91068 13.9369 4.96241 12.7265 3.36593 11.1142C1.77492 9.50746 0.4375 7.40357 0.4375 5.125ZM5.125 1.5625C3.15749 1.5625 1.5625 3.1575 1.5625 5.125C1.5625 6.97144 2.66258 8.80503 4.16532 10.3226C5.59122 11.7626 7.29324 12.8295 8.5 13.2762C9.70676 12.8295 11.4088 11.7626 12.8347 10.3226C14.3374 8.80503 15.4375 6.97144 15.4375 5.125C15.4375 3.1575 13.8425 1.5625 11.875 1.5625C10.6706 1.5625 9.60558 2.15966 8.95991 3.07654C8.85455 3.22616 8.68299 3.31518 8.5 3.31518C8.31701 3.31518 8.14545 3.22616 8.04009 3.07654C7.39442 2.15966 6.32941 1.5625 5.125 1.5625Z"
                  fill="#FF2D55"
                />
              </svg>
            )}
            {isLiked && (
              <svg
                width="current"
                height="current"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.25 6.5C0.25 3.04824 3.04822 0.25 6.5 0.25C8.26772 0.25 9.86389 0.984376 11 2.16271C12.1361 0.984376 13.7323 0.25 15.5 0.25C18.9518 0.25 21.75 3.04824 21.75 6.5C21.75 9.53809 19.9668 12.3433 17.8454 14.4856C15.7168 16.6353 13.1191 18.2492 11.2365 18.8748C11.083 18.9259 10.917 18.9259 10.7635 18.8748C8.88091 18.2492 6.28321 16.6353 4.15457 14.4856C2.03322 12.3433 0.25 9.53809 0.25 6.5ZM6.5 1.75C3.87665 1.75 1.75 3.87666 1.75 6.5C1.75 8.96191 3.21678 11.4067 5.22043 13.4302C7.12163 15.3502 9.39099 16.7727 11 17.3682C12.609 16.7727 14.8784 15.3502 16.7796 13.4302C18.7832 11.4067 20.25 8.96191 20.25 6.5C20.25 3.87666 18.1233 1.75 15.5 1.75C13.8941 1.75 12.4741 2.54621 11.6132 3.76872C11.4727 3.96821 11.244 4.0869 11 4.0869C10.756 4.0869 10.5273 3.96821 10.3868 3.76872C9.52589 2.54621 8.10588 1.75 6.5 1.75Z"
                  fill="#FF2D55"
                />
              </svg>
            )}
            좋아요
          </button>
          <button
            className="requestBtn"
            isJoined={isJoined}
            onClick={() => {
              const result = window.confirm('모임에 참여하시겠습니까?');
              if (result) {
                const state = {
                  setIsJoined,
                  isJoined,
                  thunderPostId: meet.thunderPostId
                };
                onJoin(state);
              }
            }}
          >
            참가할래요
          </button>
        </ButtonContainer>
      )}

      {meet.member?.length > 0 && (
        <MembersContainer>
          <Divider />
          <p>참여 인원 목록</p>
          {meet.members.map((member) => {
            <ul className="memberLists">
              <li>
                <div>
                  <img src={member.profileUrl} alt="profileImg" />
                  <p>{member.nickname}</p>
                </div>
                {nickname === meet.nickname ? (
                  <p className="host">주최자</p>
                ) : (
                  <p className="participant">참여자</p>
                )}
              </li>
            </ul>;
          })}
        </MembersContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  .postTopInfo {
    padding: 1rem;
    .title {
      font-style: normal;
      font-weight: 600;
      font-size: 17px;
      line-height: 24px;
      color: #000000;
      margin-bottom: 0.875rem;
    }
  }

  .postUserInfoContainer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .moreBtn {
      display: flex;
      padding: 0;
      svg {
        font-size: 1rem;
      }
    }
  }

  .postUserInfo {
    display: flex;

    align-items: center;
    p {
      font-style: normal;
      font-weight: 300;
      font-size: 13px;
      line-height: 143.84%;
      margin: 0 5px;
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 6px;
      border-radius: 50%;
      border: 1px solid #ececee;
    }
    .nickname {
      font-style: normal;
      font-weight: 600;
      font-size: 0.938rem;
      line-height: 1.125rem;
      /* identical to box height */
      margin-right: 5px;
      margin-left: 0;
      color: #000000;
    }
    .moreBtn {
      display: flex;

      align-items: center;
      padding: 0;
    }
    svg {
      font-size: 1rem;
    }
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  z-index: 99;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
  border-radius: 4px;
  /* padding: 4px 0px; */
  color: rgb(61, 61, 61);
  bottom: auto;
  top: 1.2rem;
  left: auto;
  right: 0;
  transform: none;
  font-weight: bold;
  box-sizing: border-box;
  .editBtn {
    border-bottom: 1px solid #ececec;
  }
  .deleteBtn {
    color: #f54e4e;
  }
  div {
    display: flex;
    align-items: center;

    font-weight: bold;
    color: gray;
    white-space: nowrap;
    cursor: pointer;
    padding: 0.5rem 1rem;
    /* min-width: 50px; */
    /* height: 40px;
    line-height: 40px; */
    font-size: 0.75rem;
    box-sizing: border-box;
    svg {
      margin-left: 0.5rem;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`;

const AddressContainer = styled.div`
  padding: 0.938rem 1rem;
  display: flex;
  align-items: center;
  p {
    margin-left: 0.5rem;
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.063rem;
    display: flex;
    align-items: center;

    color: #8e8e93;
  }
`;

const PostDetailInfo = styled.div`
  padding: 0 1rem;
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 0.938rem;
    line-height: 1.125rem;
    padding: 10px 0;
    gap: 4px;
  }
  div.meetInfo {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      align-items: center;
      img {
        width: 1rem;
        margin-right: 0.375rem;
      }
    }
  }
  div {
    display: flex;
    margin-bottom: 0.5rem;
  }
  svg {
    margin-right: 0.375rem;
  }
  p {
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.063rem;
    margin-right: 0.375rem;
  }
`;

const PostDescription = styled.div`
  padding: 1.625rem 1rem;
`;

const ButtonContainer = styled.div`
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 6px 10px;

    width: 167.5px;
    height: 32px;

    background: #eff7ff;
    border-radius: 4px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 1;

    font-style: normal;
    font-weight: 500;
    font-size: 0.813rem;
    line-height: 157.34%;
  }
  .likeBtn {
    /* background-color: ${(props) =>
      props.isLiked ? '#EFF7FF' : '#007AFF'}; */
    svg {
      margin-right: 5px;
    }
  }
`;

const Divider = styled.div`
  background-color: #ececec;
  height: 0.5rem;
`;

const MembersContainer = styled.div`
  padding: 1rem;
`;
export default MeetDetail;
