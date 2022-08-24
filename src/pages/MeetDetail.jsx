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

const MeetDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const { meet, isLiked, setIsLiked, isJoined, setIsJoined } = useDetailMeet(
    params.thunderPostId
  );

  const onDelete = useAddMeet();

  useEffect(() => {
    if (meet) {
      setIsLiked(meet.liked);
      setIsJoined(meet.joined);
    }
  }, []);

  const nickname = useSelector((state) => state.auth.nickname);

  // FIXME: MUTATION으로 바꿔야함
  const onLike = (thunderPostId) => {
    if (isLiked) {
      meetsApi.deleteLike(thunderPostId);
    } else {
      meetsApi.postLike(thunderPostId);
    }
    setIsLiked((prev) => !prev);
  };

  const onRequest = (thunderPostId) => {
    if (isJoined) {
      meetsApi.deleteRequest(thunderPostId);
    } else {
      meetsApi.postRequest(thunderPostId);
    }
    setIsJoined((prev) => !prev);
  };

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
            {/* <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="16" height="16" rx="8" fill="#E5E5EA" />
            </svg> */}
            <p>
              인원 {meet.currentMember} / {meet.goalMember}
            </p>
          </div>
          <div>
            {/* <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="16" height="16" rx="8" fill="#E5E5EA" />
            </svg> */}
            <img src={'/assets/wave.png'} alt="" />
            <p>모임 날짜</p>
            <p>{meet.meetDate}</p>
          </div>
          <div>
            {/* <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="16" height="16" rx="8" fill="#E5E5EA" />
            </svg> */}
            <img src={'/assets/wave.png'} alt="" />
            <p>모임 기간</p>
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
            onClick={() => onRequest(meet.thunderPostId)}
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
