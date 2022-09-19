import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FiMoreHorizontal } from 'react-icons/fi';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useDetailMeet } from '../../react-query/hooks/useDetailMeet';
import { useSelector } from 'react-redux';
import { useAddMeet } from '../../react-query/hooks/useDeleteMeet';
import { useLike } from '../../react-query/hooks/useLike';
import { useJoin } from '../../react-query/hooks/useJoin';
import Navigate from '../../layout/Navigate';

const MeetDetail = () => {
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');

  const { meet, isLiked, setIsLiked, isJoined, setIsJoined } = useDetailMeet(
    params.thunderPostId
  );
  const onDelete = useAddMeet();
  const onLike = useLike();
  const onJoin = useJoin();

  // initial like, join state 값 설정
  useEffect(() => {
    if (meet) {
      setIsLiked(meet.liked);
      setIsJoined(meet.joined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nickname = useSelector((state) => state.auth.nickname);

  const onShowModal = () => {
    setShowModal((prev) => !prev);
  };

  const onRequestChat = (nickname) => {
    navigate(`/chat/${nickname}`);
  };

  return (
    <Container>
      <Navigate text={'모임'} />
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
              <path d="M1 1V9" stroke="#C7C7CC" strokeLinecap="round" />
            </svg>
            <p>{meet.createdAt}</p>
            <svg
              width="2"
              height="10"
              viewBox="0 0 2 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1V9" stroke="#C7C7CC" strokeLinecap="round" />
            </svg>
            <p>{meet.after}</p>
            <svg
              width="2"
              height="10"
              viewBox="0 0 2 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1 1V9" stroke="#C7C7CC" strokeLinecap="round" />
            </svg>
            <p>조회 {meet.viewCount}</p>
          </div>
          {accessToken && nickname === meet.nickname && (
            <button className="moreBtn" onClick={onShowModal}>
              <FiMoreHorizontal />
            </button>
          )}
          {accessToken && nickname && nickname !== meet.nickname && (
            <button
              className="chatBtn"
              onClick={() => onRequestChat(meet.nickname)}
            >
              <BsFillChatDotsFill />
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
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 14.6663C8 14.6663 13 10.6663 13 6.33301C13 3.57157 10.7614 1.33301 8 1.33301C5.23857 1.33301 3 3.57157 3 6.33301C3 10.6663 8 14.6663 8 14.6663Z"
            fill="#007AFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 6.33301C2.5 3.29543 4.96242 0.833008 8 0.833008C11.0376 0.833008 13.5 3.29543 13.5 6.33301C13.5 8.67687 12.1577 10.8741 10.8884 12.4396C10.246 13.2318 9.60492 13.8835 9.12456 14.3371C8.88407 14.5643 8.68307 14.7425 8.54128 14.8647C8.47036 14.9259 8.41419 14.973 8.37523 15.0053C8.35575 15.0215 8.34057 15.0339 8.32998 15.0425L8.3176 15.0526L8.31407 15.0554L8.31298 15.0563L8.31261 15.0566C8.31247 15.0567 8.31235 15.0568 8 14.6663C7.68765 15.0568 7.68753 15.0567 7.68739 15.0566L7.68702 15.0563L7.68593 15.0554L7.6824 15.0526L7.67002 15.0425C7.65943 15.0339 7.64425 15.0215 7.62477 15.0053C7.58581 14.973 7.52964 14.9259 7.45872 14.8647C7.31693 14.7425 7.11593 14.5643 6.87544 14.3371C6.39508 13.8835 5.75396 13.2318 5.11162 12.4396C3.84231 10.8741 2.5 8.67687 2.5 6.33301ZM8 14.6663L7.68765 15.0568C7.87026 15.2029 8.12974 15.2029 8.31235 15.0568L8 14.6663ZM8 14.01C8.11918 13.9051 8.26783 13.7708 8.43794 13.6101C8.89508 13.1784 9.50396 12.5592 10.1116 11.8098C11.3423 10.2919 12.5 8.32248 12.5 6.33301C12.5 3.84772 10.4853 1.83301 8 1.83301C5.51471 1.83301 3.5 3.84772 3.5 6.33301C3.5 8.32248 4.65769 10.2919 5.88838 11.8098C6.49604 12.5592 7.10492 13.1784 7.56206 13.6101C7.73217 13.7708 7.88081 13.9051 8 14.01Z"
            fill="#007AFF"
          />
          <path
            d="M8 8.33301C9.10457 8.33301 10 7.43757 10 6.33301C10 5.22844 9.10457 4.33301 8 4.33301C6.89543 4.33301 6 5.22844 6 6.33301C6 7.43757 6.89543 8.33301 8 8.33301Z"
            fill="#FFFBFF"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.5 6.33301C5.5 4.9523 6.61929 3.83301 8 3.83301C9.38071 3.83301 10.5 4.9523 10.5 6.33301C10.5 7.71372 9.38071 8.83301 8 8.83301C6.61929 8.83301 5.5 7.71372 5.5 6.33301ZM8 4.83301C7.17158 4.83301 6.5 5.50458 6.5 6.33301C6.5 7.16143 7.17158 7.83301 8 7.83301C8.82842 7.83301 9.5 7.16143 9.5 6.33301C9.5 5.50458 8.82842 4.83301 8 4.83301Z"
            fill="#FFFBFF"
          />
        </svg>
        <p className="area">{meet.area}</p>
        <p>{meet.address}</p>
      </AddressContainer>
      <PostDetailInfo>
        <h2>모집 정보</h2>
        <div className="meetInfo">
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.33398 8.00033C7.80465 8.00033 9.00065 6.80433 9.00065 5.33366C9.00065 3.86299 7.80465 2.66699 6.33398 2.66699C4.86332 2.66699 3.66732 3.86299 3.66732 5.33366C3.66732 6.80433 4.86332 8.00033 6.33398 8.00033ZM7.33398 8.66699H5.33398C3.12798 8.66699 1.33398 10.461 1.33398 12.667V13.3337H11.334V12.667C11.334 10.461 9.53998 8.66699 7.33398 8.66699Z"
                fill="#C7C7CC"
              />
              <path
                d="M11.0697 7.36564C11.4757 6.67369 11.6511 5.87051 11.5704 5.0723C11.451 3.88297 10.787 2.83164 9.70171 2.1123L8.96504 3.22297C9.71104 3.71764 10.165 4.4223 10.2437 5.20564C10.28 5.5697 10.2347 5.93728 10.111 6.28163C9.98741 6.62597 9.78859 6.93844 9.52904 7.1963L8.73438 7.99097L9.81304 8.30764C12.6344 9.1343 12.667 11.9716 12.667 12.0003H14.0004C14.0004 10.8076 13.363 8.47697 11.0697 7.36564Z"
                fill="#C7C7CC"
              />
            </svg>
            <p>
              인원 {meet.currentMember} / {meet.goalMember}
            </p>
          </div>
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.33398 8H11.334V12H7.33398V8Z" fill="#C7C7CC" />
              <path
                d="M12.6667 2.66634H11.3333V1.33301H10V2.66634H6V1.33301H4.66667V2.66634H3.33333C2.598 2.66634 2 3.26434 2 3.99967V13.333C2 14.0683 2.598 14.6663 3.33333 14.6663H12.6667C13.402 14.6663 14 14.0683 14 13.333V3.99967C14 3.26434 13.402 2.66634 12.6667 2.66634ZM12.6673 13.333H3.33333V5.33301H12.6667L12.6673 13.333Z"
                fill="#C7C7CC"
              />
            </svg>
            <p>모임 날짜</p>
            <p>{meet.meetDate}</p>
          </div>
          <div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.66602 7.33301H5.99935V8.66634H4.66602V7.33301ZM4.66602 9.99967H5.99935V11.333H4.66602V9.99967ZM7.33268 7.33301H8.66602V8.66634H7.33268V7.33301ZM7.33268 9.99967H8.66602V11.333H7.33268V9.99967ZM9.99935 7.33301H11.3327V8.66634H9.99935V7.33301ZM9.99935 9.99967H11.3327V11.333H9.99935V9.99967Z"
                fill="#C7C7CC"
              />
              <path
                d="M3.33333 14.6663H12.6667C13.402 14.6663 14 14.0683 14 13.333V3.99967C14 3.26434 13.402 2.66634 12.6667 2.66634H11.3333V1.33301H10V2.66634H6V1.33301H4.66667V2.66634H3.33333C2.598 2.66634 2 3.26434 2 3.99967V13.333C2 14.0683 2.598 14.6663 3.33333 14.6663ZM12.6667 5.33301L12.6673 13.333H3.33333V5.33301H12.6667Z"
                fill="#C7C7CC"
              />
            </svg>

            <p>모집 기간</p>
            <p>~ {meet.endDate}</p>
          </div>
        </div>
      </PostDetailInfo>
      <PostDescription>{meet.content}</PostDescription>
      {accessToken && nickname && nickname !== meet.nickname && (
        <ButtonContainer>
          <button
            className="likeBtn"
            onClick={() => {
              const state = {
                setIsLiked,
                isLiked,
                thunderPostId: meet.thunderPostId
              };
              onLike(state);
            }}
          >
            {isLiked ? (
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.375 3C4.09683 3 2.25 4.84684 2.25 7.125C2.25 11.25 7.125 15 9.75 15.8723C12.375 15 17.25 11.25 17.25 7.125C17.25 4.84684 15.4032 3 13.125 3C11.7299 3 10.4965 3.69259 9.75 4.75268C9.00349 3.69259 7.77011 3 6.375 3Z"
                  fill="#FF2D55"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.6875 7.125C1.6875 4.53618 3.78617 2.4375 6.375 2.4375C7.70079 2.4375 8.89792 2.98828 9.75 3.87203C10.6021 2.98828 11.7992 2.4375 13.125 2.4375C15.7138 2.4375 17.8125 4.53618 17.8125 7.125C17.8125 9.40357 16.4751 11.5075 14.8841 13.1142C13.2876 14.7265 11.3393 15.9369 9.92739 16.4061C9.81223 16.4444 9.68777 16.4444 9.57261 16.4061C8.16068 15.9369 6.21241 14.7265 4.61593 13.1142C3.02492 11.5075 1.6875 9.40357 1.6875 7.125ZM6.375 3.5625C4.40749 3.5625 2.8125 5.1575 2.8125 7.125C2.8125 8.97144 3.91258 10.805 5.41532 12.3226C6.84122 13.7626 8.54324 14.8295 9.75 15.2762C10.9568 14.8295 12.6588 13.7626 14.0847 12.3226C15.5874 10.805 16.6875 8.97144 16.6875 7.125C16.6875 5.1575 15.0925 3.5625 13.125 3.5625C11.9206 3.5625 10.8556 4.15966 10.2099 5.07654C10.1045 5.22616 9.93299 5.31518 9.75 5.31518C9.56701 5.31518 9.39545 5.22616 9.29009 5.07654C8.64442 4.15966 7.57941 3.5625 6.375 3.5625Z"
                  fill="#FF2D55"
                />
              </svg>
            ) : (
              <svg
                width="19"
                height="18"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.25 6.5C0.25 3.04824 3.04822 0.25 6.5 0.25C8.26772 0.25 9.86389 0.984376 11 2.16271C12.1361 0.984376 13.7323 0.25 15.5 0.25C18.9518 0.25 21.75 3.04824 21.75 6.5C21.75 9.53809 19.9668 12.3433 17.8454 14.4856C15.7168 16.6353 13.1191 18.2492 11.2365 18.8748C11.083 18.9259 10.917 18.9259 10.7635 18.8748C8.88091 18.2492 6.28321 16.6353 4.15457 14.4856C2.03322 12.3433 0.25 9.53809 0.25 6.5ZM6.5 1.75C3.87665 1.75 1.75 3.87666 1.75 6.5C1.75 8.96191 3.21678 11.4067 5.22043 13.4302C7.12163 15.3502 9.39099 16.7727 11 17.3682C12.609 16.7727 14.8784 15.3502 16.7796 13.4302C18.7832 11.4067 20.25 8.96191 20.25 6.5C20.25 3.87666 18.1233 1.75 15.5 1.75C13.8941 1.75 12.4741 2.54621 11.6132 3.76872C11.4727 3.96821 11.244 4.0869 11 4.0869C10.756 4.0869 10.5273 3.96821 10.3868 3.76872C9.52589 2.54621 8.10588 1.75 6.5 1.75Z"
                  fill="#FF2D55"
                />
              </svg>
            )}
            좋아요
          </button>
          {isJoined && meet.goalMember - meet.currentMember === 0 && (
            <button
              className="requestedBtn"
              style={{ backgroundColor: '#007AFF', color: 'white' }}
              onClick={() => {
                const state = {
                  setIsJoined,
                  isJoined,
                  thunderPostId: meet.thunderPostId
                };
                onJoin(state);
              }}
            >
              마감 (참가 취소)
            </button>
          )}
          {!isJoined && meet.goalMember - meet.currentMember === 0 && (
            <button
              disabled
              className="requestedBtn"
              style={{ backgroundColor: '#007AFF', color: 'white' }}
              onClick={() => {
                const state = {
                  setIsJoined,
                  isJoined,
                  thunderPostId: meet.thunderPostId
                };
                onJoin(state);
              }}
            >
              마감
            </button>
          )}
          {meet.goalMember - meet.currentMember > 0 && isJoined && (
            <button
              className="requestedBtn"
              style={{ backgroundColor: '#007AFF', color: 'white' }}
              onClick={() => {
                const state = {
                  setIsJoined,
                  isJoined,
                  thunderPostId: meet.thunderPostId
                };
                onJoin(state);
              }}
            >
              참가 취소
            </button>
          )}
          {meet.goalMember - meet.currentMember > 0 && !isJoined && (
            <button
              className="requestBtn"
              onClick={() => {
                const state = {
                  setIsJoined,
                  isJoined,
                  thunderPostId: meet.thunderPostId
                };
                onJoin(state);
              }}
            >
              참가하기
            </button>
          )}
        </ButtonContainer>
      )}
      {meet.members?.length > 0 && (
        <MembersContainer>
          <DividerMembers />
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
              <div className="memberLists" key={member.email}>
                <img src={member.profileImg} alt="profileImg" />
                <div>
                  <p>{member.nickname}</p>
                  {member.nickname && <p className="participant">참여자</p>}
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
  /* border-left: 1px solid #ececee;
  border-right: 1px solid #ececee;
  border-bottom: 1px solid #ececee; */
  @media screen and (min-width: 1024px) {
    margin: 0 auto;
    width: 100%;
  }
  .postTopInfo {
    padding: 1rem 0;
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
    }
    .chatBtn {
      display: flex;
      align-items: center;
      padding: 0;
      svg {
        color: #007aff;
      }
    }
    svg {
      font-size: 1.3rem;
    }
  }

  .postUserInfo {
    display: flex;

    align-items: center;
    p {
      font-style: normal;
      font-weight: 300;
      font-size: 0.8125rem;
      margin: 0 0.33rem;
    }
    img {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.33rem;
      border-radius: 50%;
      border: 1px solid #ececee;
    }
    .nickname {
      font-style: normal;
      font-weight: 600;
      font-size: 0.938rem;
      line-height: 1.125rem;
      /* identical to box height */
      margin-right: 0.3125rem;
      margin-left: 0;
      color: #000000;
    }
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  z-index: 99;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(230, 230, 230);
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
  border-radius: 0.25rem;
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
    font-size: 0.75rem;
    box-sizing: border-box;
    svg {
      margin-left: 0.5rem;
    }
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  img {
    min-width: 100px;
    max-width: 800px;
    object-fit: cover;
  }
`;

const AddressContainer = styled.div`
  padding: 0.938rem 0;
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
  p.area {
    color: black;
    font-weight: 600;
  }
`;

const PostDetailInfo = styled.div`
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

const PostDescription = styled.pre`
  padding: 1.1625rem 0;
  font-size: 0.875rem;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const ButtonContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  gap: 0.5rem;
  button {
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: center;
    padding: 0.375rem 0.625rem;

    background-color: #eff7ff;
    border-radius: 0.25rem;

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
    svg {
      margin-right: 5px;
    }
  }
`;

const DividerMembers = styled.div``;

const MembersContainer = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 0.25rem;
  padding: 0 1rem;
  p.title {
    font-size: 1rem;
    padding-top: 0.75rem;
  }
  div.memberLists {
    display: flex;
    flex-direction: row;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  img {
    width: 2rem;
    height: 2rem;
    margin-right: 0.5rem;
    border-radius: 50%;
  }
  p {
    font-size: 0.9rem;
    font-weight: 400;
    text-align: left;
  }
  p.host {
    font-size: 0.7rem;
    font-weight: 300;
    color: #007aff;
  }
  p.participant {
    font-weight: 300;
    font-size: 0.7rem;
  }
`;
export default MeetDetail;
