import React from "react";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonItem = () => {
  return (
    <PostInfoBox>
      <Skeleton className="imageBox" height={"8rem"} />
      <Skeleton />
      <Skeleton className="postInfo" width={"5.625rem"}>
        <Skeleton className="userInfo"></Skeleton>
      </Skeleton>
    </PostInfoBox>
  );
};

const PostInfoBox = styled.div`
  border-radius: 0.8125rem;
  margin-bottom: 1.25rem;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px;
  display: grid;
  transition: 0.5s;
  &:hover {
    background: #f7faff;
  }
  .imageBox {
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
    }
  }

  .postInfo {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    h2 {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.9375rem;
      font-weight: 600;
      text-align: left;
    }
  }
  .userInfo {
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
  }
`;

export default SkeletonItem;
