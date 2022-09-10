import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Meet from '../components/Meet';
import { useMeets } from '../react-query/hooks/useMeets';
import { usePopularMeets } from '../react-query/hooks/usePopularMeets';
import PopularMeets from '../components/PopularMeets';
import NoData from '../layout/NoData';

const Meets = () => {
  const navigate = useNavigate();
  const accesstoken = localStorage.getItem('accessToken');
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
      {/* TODO: Slider, 분기, CSS 수정 */}
      <div className="scrollTest">
        <PopularMeets popularPosts={popularPosts} />
      </div>
      <MeetsPostsContainer>
        <div className="topBox">
          <h2>오픈 모임 리스트</h2>
          <button onClick={() => navigate('/meetsAll')}>
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
          <NoData text={'모임'} content={'모임'} />
        )}
        {meetsPosts.content.map((meet) => {
          return <Meet key={meet.thunderPostId} meet={meet} />;
        })}
      </MeetsPostsContainer>
      {accesstoken && (
        <PostBtn>
          <Link to="/meetAdd">
            <svg
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_225_2066)">
                <rect
                  x="5"
                  y="5"
                  width="56"
                  height="56"
                  rx="28"
                  fill="#007AFF"
                />
                <path
                  d="M23.6625 42.7501L27.905 42.7502L43.4613 27.1938L39.2187 22.9512L23.6624 38.5075L23.6625 42.7501Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M38.6884 22.4208C38.9813 22.1279 39.4561 22.1279 39.749 22.4208L43.9917 26.6635C44.1323 26.8041 44.2113 26.9949 44.2113 27.1938C44.2113 27.3927 44.1323 27.5835 43.9917 27.7241L28.4353 43.2805C28.2947 43.4211 28.1039 43.5002 27.905 43.5002L23.6625 43.5001C23.2483 43.5 22.9125 43.1643 22.9125 42.7501L22.9124 38.5075C22.9123 38.3086 22.9914 38.1178 23.132 37.9772L38.6884 22.4208ZM39.2187 24.0118L24.4124 38.8182L24.4125 42.0001L27.5943 42.0001L42.4007 27.1938L39.2187 24.0118Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M34.4457 26.6635C34.7386 26.3706 35.2135 26.3706 35.5064 26.6635L39.749 30.9062C40.0419 31.1991 40.0419 31.6739 39.749 31.9668C39.4561 32.2597 38.9813 32.2597 38.6884 31.9668L34.4457 27.7242C34.1528 27.4313 34.1528 26.9564 34.4457 26.6635Z"
                  fill="white"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_225_2066"
                  x="0"
                  y="0"
                  width="70"
                  height="70"
                  filterUnits="userSpaceOnUse"
                  color-interpolation-filters="sRGB"
                >
                  <feFlood flood-opacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dx="2" dy="2" />
                  <feGaussianBlur stdDeviation="3.5" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_225_2066"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_225_2066"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
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

    /* & ::-webkit-scrollbar-track {
      background-color: #e4e4e4;
      border-radius: 100px;
    } */

    /* &::-webkit-scrollbar-thumb {
      background-color: #217af4;
      border-radius: 0.375rem;
    } */

    /* &::-webkit-scrollbar-thumb {
      background-color: #d4aa70;
      border-radius: 100px;
    } */

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
    /* align-items: flex-start; */
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
  cursor: pointer;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`;

export default Meets;
