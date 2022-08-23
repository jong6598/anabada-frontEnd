import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { meetsApi } from '../shared/api';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Meet from '../components/Meet';
import { thunderposts } from '../shared/data';
import { queryKeys } from '../react-query/constants';
import { useMeets } from '../react-query/hooks/useMeets';
import { usePopularMeets } from '../react-query/hooks/usePopularMeets';
import PopularMeets from '../components/PopularMeets';

const Meets = () => {
  const navigate = useNavigate();

  const { meetsPosts, areaSelected, setAreaSelected } = useMeets();
  const { popularPosts, setPopularAreaSelected } = usePopularMeets();

  const onChangeArea = (e) => {
    setAreaSelected(e.target.value);
    setPopularAreaSelected(e.target.value);
  };

  return (
    <MeetsContainer>
      <CategoryContainer>
        <select
          name="area"
          id="area"
          onChange={onChangeArea}
          value={areaSelected}
        >
          <option value="GYEONGGI">서울, 경기, 인천</option>
          <option value="GANGWON">강원</option>
          <option value="GYEONBUK">대구, 경북</option>
          <option value="GYEONGNAM">부산, 울산, 경남 </option>
          <option value="JEONBUK">전북</option>
          <option value="JEONNAM">광주, 전남</option>
          <option value="CHUNGBUK">충북</option>
          <option value="CHUNGNAM">충남</option>
          <option value="JEJU">제주</option>
        </select>
      </CategoryContainer>
      {/* TODO: Slider, 분기, CSS 수정 */}
      <PopularMeets popularPosts={popularPosts} />
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
        {meetsPosts.content.map((meet) => {
          return <Meet key={meet.thunderPostId} meet={meet} />;
        })}
      </MeetsPostsContainer>
      <AddButton
        onClick={() => {
          navigate('/meetAdd');
        }}
      >
        <svg
          width="23"
          height="22"
          viewBox="0 0 23 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.6884 0.420842C16.9813 0.127949 17.4561 0.127949 17.749 0.420841L21.9917 4.66347C22.1323 4.80412 22.2113 4.99489 22.2113 5.1938C22.2113 5.39271 22.1323 5.58348 21.9917 5.72413L6.43533 21.2805C6.29467 21.4211 6.1039 21.5002 5.90498 21.5002L1.66247 21.5001C1.24827 21.5 0.912496 21.1643 0.912483 20.7501L0.912354 16.5075C0.912347 16.3086 0.991366 16.1178 1.13202 15.9772L16.6884 0.420842ZM17.2187 2.01183L2.41236 16.8182L2.41246 20.0001L5.59435 20.0001L20.4007 5.1938L17.2187 2.01183Z"
            fill="white"
          />
        </svg>
      </AddButton>
    </MeetsContainer>
  );
};

const MeetsContainer = styled.div``;

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

const AddButton = styled.button`
  position: absolute;
  width: 56px;
  height: 56px;
  right: 1rem;
  bottom: 1rem;

  background-color: #007aff;
  /* fab */

  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 57px;
`;

export default Meets;
