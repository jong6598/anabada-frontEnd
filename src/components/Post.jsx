import React from 'react';
import styled from 'styled-components';

const Post = ({ data }) => {
  return (
    <PostInfoBox>
      <ImageBox>
        <img src={data.thumbnailUrl} alt="thumbnailimage" />
        <div className="infoBox">
          {data.liked === true ? (
            <>
              <span>{data.likeCount}</span>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: 'block',
                  fill: 'red',
                  height: '24px',
                  width: '24px',
                  overflow: 'visible',
                  strokeWidth: '2',
                  stroke: 'red'
                }}
              >
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
              </svg>
            </>
          ) : (
            <>
              <p>{data.likeCount}</p>
              <svg
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: 'block',
                  fill: 'rgb(51,37,21)',
                  height: '24px',
                  width: '24px',
                  overflow: 'visible',
                  strokeWidth: '2',
                  stroke: 'white'
                }}
              >
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
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
  /* display: inline-block; */
  border-radius: 0.8125rem;
  margin-bottom: 1.25rem;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
  display: grid;
  /* place-items: center; */
  transition: 0.5s;
  &:hover {
    background: #f0f7fd;
  }
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
    /* @media screen and (min-width: 1024px) {
      min-width: 12.5rem;
    } */
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  h2 {
    display: block;
    /* white-space: nowrap; */
    overflow: hidden;
    text-overflow: ellipsis;
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
