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
  const onLike = useLike(isLiked);
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
                  navigate(`/meets/${params.thunderPostId}/edit`);
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
              {meet.startDate} ~ {meet.endDate}
            </p>
          </div>
        </div>
      </PostDetailInfo>
      <PostDescription>{meet.content}</PostDescription>
      {nickname !== meet.nickname && (
        <ButtonContainer>
          <button
            className="likeBtn"
            onClick={() => onLike(meet.thunderPostId)}
            isLiked={isLiked}
          >
            <svg
              width="17"
              height="15"
              viewBox="0 0 17 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.6875 5.125C0.6875 2.53618 2.78617 0.4375 5.375 0.4375C6.70079 0.4375 7.89792 0.988282 8.75 1.87203C9.60208 0.988282 10.7992 0.4375 12.125 0.4375C14.7138 0.4375 16.8125 2.53618 16.8125 5.125C16.8125 7.40357 15.4751 9.50747 13.8841 11.1142C12.2876 12.7265 10.3393 13.9369 8.92739 14.4061C8.81223 14.4444 8.68777 14.4444 8.57261 14.4061C7.16068 13.9369 5.21241 12.7265 3.61593 11.1142C2.02492 9.50747 0.6875 7.40357 0.6875 5.125ZM5.375 1.5625C3.40749 1.5625 1.8125 3.1575 1.8125 5.125C1.8125 6.97144 2.91258 8.80503 4.41532 10.3226C5.84122 11.7626 7.54324 12.8295 8.75 13.2762C9.95676 12.8295 11.6588 11.7626 13.0847 10.3226C14.5874 8.80503 15.6875 6.97144 15.6875 5.125C15.6875 3.1575 14.0925 1.5625 12.125 1.5625C10.9206 1.5625 9.85558 2.15966 9.20991 3.07654C9.10455 3.22616 8.93299 3.31518 8.75 3.31518C8.56701 3.31518 8.39545 3.22616 8.29009 3.07654C7.64442 2.15966 6.57941 1.5625 5.375 1.5625Z"
                fill="#FF2D55"
              />
            </svg>
            좋아요
          </button>
          <button
            className="requestBtn"
            onClick={() => {
              const result = window.confirm('모임에 참여하시겠습니까?');
              if (result) {
                onJoin(meet.thunderPostId);
              }
            }}
          >
            참가할래요
          </button>
        </ButtonContainer>
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
    background-color: ${(props) => (props.isLiked ? 'green' : 'transparent')};
    svg {
      margin-right: 7px;
    }
  }
`;
export default MeetDetail;
