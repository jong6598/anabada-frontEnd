import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Meet from "../../components/Meets/Meet";
import { useMeets } from "../../react-query/hooks/useMeets";
import { usePopularMeets } from "../../react-query/hooks/usePopularMeets";
import PopularMeets from "../../components/Meets/PopularMeets";
import NoData from "../../layout/NoData";
import { TbPencil } from "react-icons/tb";

const Meets = () => {
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem("accessToken");
  const { meetsPosts, areaSelected, setAreaSelected } = useMeets();
  const { popularPosts, setPopularAreaSelected } = usePopularMeets();

  const onChangeArea = (e) => {
    setAreaSelected(e.target.value);
    setPopularAreaSelected(e.target.value);
  };

  return (
    <MeetsContainer>
      <CategoryContainer>
        <select id="area" onChange={onChangeArea} value={areaSelected}>
          <option value="ALL">전국</option>
          <option value="서울·경기·인천">서울·경기·인천</option>
          <option value="강원">강원</option>
          <option value="대구·경북">대구·경북</option>
          <option value="부산·울산·경남">부산·울산·경남</option>
          <option value="전북">전북</option>
          <option value="광주·전남">광주·전남</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="제주">제주</option>
        </select>
      </CategoryContainer>

      <div className="scrollTest">
        <PopularMeets popularPosts={popularPosts} />
      </div>
      <MeetsPostsContainer>
        <div className="topBox">
          <h2>오픈 모임 리스트</h2>
          <button onClick={() => navigate("/meetsAll")}>
            <svg
              width="9"
              height="14"
              viewBox="0 0 9 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.96967 0.46967C1.26256 0.176777 1.73744 0.176777 2.03033 0.46967L8.03033 6.46967C8.32322 6.76256 8.32322 7.23744 8.03033 7.53033L2.03033 13.5303C1.73744 13.8232 1.26256 13.8232 0.96967 13.5303C0.676777 13.2374 0.676777 12.7626 0.96967 12.4697L6.43934 7L0.96967 1.53033C0.676777 1.23744 0.676777 0.762563 0.96967 0.46967Z"
                fill="#1C1B1F"
              />
            </svg>
          </button>
        </div>
        {meetsPosts.content.length === 0 && (
          <NoData text={"모임"} content={"모임"} />
        )}
        {meetsPosts.content.map((meet) => {
          return <Meet key={meet.thunderPostId} meet={meet} />;
        })}
      </MeetsPostsContainer>
      {accesstoken && (
        <PostBtn>
          <Link to="/meetAdd">
            <TbPencil />
          </Link>
        </PostBtn>
      )}
    </MeetsContainer>
  );
};

const MeetsContainer = styled.div`
  div.scrollTest {
    overflow-x: auto;

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 0.375rem;
      background-color: rgba(255, 255, 255, 3);
    }

    ::-webkit-scrollbar-track {
      background-color: #ececec;
      border-radius: 100px;
    }

    &::-webkit-scrollbar-thumb {
      background-image: linear-gradient(180deg, #d7e7ee 5%, #217af4 100%);
      box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
      border-radius: 100px;
    }
  }
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.875rem 0;
  gap: 0.875rem;
  select {
    padding: 0.625rem;
    gap: 0.188rem;
    background: #ffffff;
    border: 1px solid #c7c7cc;
    border-radius: 4px;
    flex: none;
    order: 0;
    flex-grow: 0;
    outline: none;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0.625rem 0;
    gap: 0.625rem;

    background: #f2f2f7;
    border-radius: 42px;

    flex: none;
    order: 1;
    flex-grow: 1;
  }
  input {
    font-style: normal;
    font-weight: 400;
    font-size: 0.875;
    line-height: 1.125rem;
    /* identical to box height */

    flex: none;
    order: 0;
    flex-grow: 0;

    outline: none;
    border: none;
    background-color: transparent;
    color: #c7c7cc;
  }
`;

const MeetsPostsContainer = styled.div`
  div.topBox {
    margin-top: 1.5625rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.625rem;
  }
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 1.313rem;
    line-height: 143.84%;
    /* or 30px */
    margin: 0;
    color: #000000;
  }
`;

const PostBtn = styled.div`
  position: fixed;
  bottom: 1.7rem;
  right: 2.3rem;
  z-index: 300;
  cursor: pointer;
  width: 60px;
  height: 60px;

  background-color: #007aff;
  border-radius: 50%;
  opacity: 0.9;

  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 2rem;
    color: white;
    font-weight: 200;
  }
`;

export default Meets;
