import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
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

  console.log(meet)
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
            <img src={meet.profileImg} alt="profileUrl" />
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
            <p>{meet.after}</p>
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
                  navigate(`/meetAdd/${params.thunderPostId}/edit`);
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
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 14.6663C8 14.6663 13 10.6663 13 6.33301C13 3.57157 10.7614 1.33301 8 1.33301C5.23857 1.33301 3 3.57157 3 6.33301C3 10.6663 8 14.6663 8 14.6663Z" fill="#007AFF" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 6.33301C2.5 3.29543 4.96242 0.833008 8 0.833008C11.0376 0.833008 13.5 3.29543 13.5 6.33301C13.5 8.67687 12.1577 10.8741 10.8884 12.4396C10.246 13.2318 9.60492 13.8835 9.12456 14.3371C8.88407 14.5643 8.68307 14.7425 8.54128 14.8647C8.47036 14.9259 8.41419 14.973 8.37523 15.0053C8.35575 15.0215 8.34057 15.0339 8.32998 15.0425L8.3176 15.0526L8.31407 15.0554L8.31298 15.0563L8.31261 15.0566C8.31247 15.0567 8.31235 15.0568 8 14.6663C7.68765 15.0568 7.68753 15.0567 7.68739 15.0566L7.68702 15.0563L7.68593 15.0554L7.6824 15.0526L7.67002 15.0425C7.65943 15.0339 7.64425 15.0215 7.62477 15.0053C7.58581 14.973 7.52964 14.9259 7.45872 14.8647C7.31693 14.7425 7.11593 14.5643 6.87544 14.3371C6.39508 13.8835 5.75396 13.2318 5.11162 12.4396C3.84231 10.8741 2.5 8.67687 2.5 6.33301ZM8 14.6663L7.68765 15.0568C7.87026 15.2029 8.12974 15.2029 8.31235 15.0568L8 14.6663ZM8 14.01C8.11918 13.9051 8.26783 13.7708 8.43794 13.6101C8.89508 13.1784 9.50396 12.5592 10.1116 11.8098C11.3423 10.2919 12.5 8.32248 12.5 6.33301C12.5 3.84772 10.4853 1.83301 8 1.83301C5.51471 1.83301 3.5 3.84772 3.5 6.33301C3.5 8.32248 4.65769 10.2919 5.88838 11.8098C6.49604 12.5592 7.10492 13.1784 7.56206 13.6101C7.73217 13.7708 7.88081 13.9051 8 14.01Z" fill="#007AFF" />
          <path d="M8 8.33301C9.10457 8.33301 10 7.43757 10 6.33301C10 5.22844 9.10457 4.33301 8 4.33301C6.89543 4.33301 6 5.22844 6 6.33301C6 7.43757 6.89543 8.33301 8 8.33301Z" fill="#FFFBFF" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.5 6.33301C5.5 4.9523 6.61929 3.83301 8 3.83301C9.38071 3.83301 10.5 4.9523 10.5 6.33301C10.5 7.71372 9.38071 8.83301 8 8.83301C6.61929 8.83301 5.5 7.71372 5.5 6.33301ZM8 4.83301C7.17158 4.83301 6.5 5.50458 6.5 6.33301C6.5 7.16143 7.17158 7.83301 8 7.83301C8.82842 7.83301 9.5 7.16143 9.5 6.33301C9.5 5.50458 8.82842 4.83301 8 4.83301Z" fill="#FFFBFF" />
        </svg>

        <p>
          {meet.address}
        </p>
      </AddressContainer>
      <PostDetailInfo>
        <h2>모집 정보</h2>
        <div className="meetInfo">
          <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.33398 8.00033C7.80465 8.00033 9.00065 6.80433 9.00065 5.33366C9.00065 3.86299 7.80465 2.66699 6.33398 2.66699C4.86332 2.66699 3.66732 3.86299 3.66732 5.33366C3.66732 6.80433 4.86332 8.00033 6.33398 8.00033ZM7.33398 8.66699H5.33398C3.12798 8.66699 1.33398 10.461 1.33398 12.667V13.3337H11.334V12.667C11.334 10.461 9.53998 8.66699 7.33398 8.66699Z" fill="#C7C7CC" />
              <path d="M11.0697 7.36564C11.4757 6.67369 11.6511 5.87051 11.5704 5.0723C11.451 3.88297 10.787 2.83164 9.70171 2.1123L8.96504 3.22297C9.71104 3.71764 10.165 4.4223 10.2437 5.20564C10.28 5.5697 10.2347 5.93728 10.111 6.28163C9.98741 6.62597 9.78859 6.93844 9.52904 7.1963L8.73438 7.99097L9.81304 8.30764C12.6344 9.1343 12.667 11.9716 12.667 12.0003H14.0004C14.0004 10.8076 13.363 8.47697 11.0697 7.36564Z" fill="#C7C7CC" />
            </svg>
            <p>
              인원 {meet.currentMember} / {meet.goalMember}
            </p>
          </div>
          <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.33398 8H11.334V12H7.33398V8Z" fill="#C7C7CC" />
              <path d="M12.6667 2.66634H11.3333V1.33301H10V2.66634H6V1.33301H4.66667V2.66634H3.33333C2.598 2.66634 2 3.26434 2 3.99967V13.333C2 14.0683 2.598 14.6663 3.33333 14.6663H12.6667C13.402 14.6663 14 14.0683 14 13.333V3.99967C14 3.26434 13.402 2.66634 12.6667 2.66634ZM12.6673 13.333H3.33333V5.33301H12.6667L12.6673 13.333Z" fill="#C7C7CC" />
            </svg>
            <p>모임 날짜</p>
            <p>{meet.meetDate}</p>
          </div>
          <div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.66602 7.33301H5.99935V8.66634H4.66602V7.33301ZM4.66602 9.99967H5.99935V11.333H4.66602V9.99967ZM7.33268 7.33301H8.66602V8.66634H7.33268V7.33301ZM7.33268 9.99967H8.66602V11.333H7.33268V9.99967ZM9.99935 7.33301H11.3327V8.66634H9.99935V7.33301ZM9.99935 9.99967H11.3327V11.333H9.99935V9.99967Z" fill="#C7C7CC" />
              <path d="M3.33333 14.6663H12.6667C13.402 14.6663 14 14.0683 14 13.333V3.99967C14 3.26434 13.402 2.66634 12.6667 2.66634H11.3333V1.33301H10V2.66634H6V1.33301H4.66667V2.66634H3.33333C2.598 2.66634 2 3.26434 2 3.99967V13.333C2 14.0683 2.598 14.6663 3.33333 14.6663ZM12.6667 5.33301L12.6673 13.333H3.33333V5.33301H12.6667Z" fill="#C7C7CC" />
            </svg>

            <p>모집 기간</p>
            <p>
              ~ {meet.endDate}
            </p>
          </div>
        </div>
      </PostDetailInfo>
      <PostDescription>{meet.content}</PostDescription>
      {nickname !== meet.nickname && (
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

      {meet.members?.length > 0 && (
        <MembersContainer>
          <Divider />
          <p className="title">참여 인원 목록</p>
          <div className="memberLists">
              <img src={meet.profileImg} alt="profileImg" />
              <div>
                <p>{meet.nickname}</p>
                <p className="host">주최자</p>
              </div> 
            </div>
          {meet.members.map((member) => {
            return (
              <div className="memberLists">
                    <img src={member.profileImg} alt="profileImg" />
                    <div>
                    <p>{member.nickname}</p>
                  {nickname !== member.nickname && 
                    <p className="participant">참여자</p>
                  }
                 </div> 
              </div>
            );
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
  p.title{
    font-size: 1rem;
    padding-top: 0.75rem;
  }
  div.memberLists{
    display: flex;
    flex-direction: row;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    border-bottom: 0.1rem solid #ececec;
;
  }
  img{
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    border-radius: 50%;
  }
  p{
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
  }
  p.host{
    font-size: 0.7rem;
    font-weight: 300;
    color: #007AFF;
  }
  p.participant{
    font-weight: 300;
    font-size: 0.7rem;
  }
`;
export default MeetDetail;
