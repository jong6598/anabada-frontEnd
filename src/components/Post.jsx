import React from 'react';
import styled from 'styled-components';

const Post = ({ data }) => {
  return (
    <PostInfoBox>
      <ImageBox>
        <img src={data.thumbnailUrl} alt="thumbnailimage" />
        <div>
          {data.liked === true ? (
            <>
              <span>{data.likeCount}</span>
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1.6875 7.125C1.6875 4.53618 3.78617 2.4375 6.375 2.4375C7.70079 2.4375 8.89792 2.98828 9.75 3.87203C10.6021 2.98828 11.7992 2.4375 13.125 2.4375C15.7138 2.4375 17.8125 4.53618 17.8125 7.125C17.8125 9.40357 16.4751 11.5075 14.8841 13.1142C13.2876 14.7265 11.3393 15.9369 9.92739 16.4061C9.81223 16.4444 9.68777 16.4444 9.57261 16.4061C8.16068 15.9369 6.21241 14.7265 4.61593 13.1142C3.02492 11.5075 1.6875 9.40357 1.6875 7.125ZM6.375 3.5625C4.40749 3.5625 2.8125 5.1575 2.8125 7.125C2.8125 8.97144 3.91258 10.805 5.41532 12.3226C6.84122 13.7626 8.54324 14.8295 9.75 15.2762C10.9568 14.8295 12.6588 13.7626 14.0847 12.3226C15.5874 10.805 16.6875 8.97144 16.6875 7.125C16.6875 5.1575 15.0925 3.5625 13.125 3.5625C11.9206 3.5625 10.8556 4.15966 10.2099 5.07654C10.1045 5.22616 9.93299 5.31518 9.75 5.31518C9.56701 5.31518 9.39545 5.22616 9.29009 5.07654C8.64442 4.15966 7.57941 3.5625 6.375 3.5625Z"
                  fill="#FF2D55"
                />
              </svg>
            </>
          ) : (
            <>
              <p>{data.likeCount}</p>
              <svg
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.25 6.5C0.25 3.04824 3.04822 0.25 6.5 0.25C8.26772 0.25 9.86389 0.984376 11 2.16271C12.1361 0.984376 13.7323 0.25 15.5 0.25C18.9518 0.25 21.75 3.04824 21.75 6.5C21.75 9.53809 19.9668 12.3433 17.8454 14.4856C15.7168 16.6353 13.1191 18.2492 11.2365 18.8748C11.083 18.9259 10.917 18.9259 10.7635 18.8748C8.88091 18.2492 6.28321 16.6353 4.15457 14.4856C2.03322 12.3433 0.25 9.53809 0.25 6.5ZM6.5 1.75C3.87665 1.75 1.75 3.87666 1.75 6.5C1.75 8.96191 3.21678 11.4067 5.22043 13.4302C7.12163 15.3502 9.39099 16.7727 11 17.3682C12.609 16.7727 14.8784 15.3502 16.7796 13.4302C18.7832 11.4067 20.25 8.96191 20.25 6.5C20.25 3.87666 18.1233 1.75 15.5 1.75C13.8941 1.75 12.4741 2.54621 11.6132 3.76872C11.4727 3.96821 11.244 4.0869 11 4.0869C10.756 4.0869 10.5273 3.96821 10.3868 3.76872C9.52589 2.54621 8.10588 1.75 6.5 1.75Z"
                  fill="white"
                />
              </svg>
            </>
          )}
        </div>
      </ImageBox>
      <PostInfo>
        <h2>{data.title}</h2>
        <UserInfo>
          <img src={data.profileImg} alt="" />
          <h3>{data.nickname}</h3>
        </UserInfo>
      </PostInfo>
    </PostInfoBox>
  );
};

export default Post;

const PostInfoBox = styled.div`
  display: inline-block;
  border-radius: 0.8125rem;
  margin-bottom: 1.25rem;
  /* border: 1px solid #ececec; */
`;

const ImageBox = styled.div`
  display: flex;
  position: relative;

  div {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    bottom: 1.630625rem;
    right: 0.755625rem;
  }
  span {
    font-size: 0.75rem;
    font-weight: 600;
    color: #ff2d55;
  }

  p {
    font-size: 0.75rem;
    font-weight: 600;
    color: #ffffff;
  }

  img {
    display: flex;
    justify-content: center;
    align-items: center;
    object-fit: contain;
    border-radius: 0.8125rem;
    margin-bottom: 0.875rem;
    width: 100%;
    /* border: 1px solid #ececec; */
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  h2 {
    font-size: 0.9375rem;
    font-weight: 600;
    text-align: left;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 1.375rem;
    width: 1.375rem;
    border-radius: 50%;
    margin-right: 0.375rem;
    border: 1px solid #ececec;
  }
  h3 {
    font-size: 0.75rem;
    font-weight: 300;
  }
`;
