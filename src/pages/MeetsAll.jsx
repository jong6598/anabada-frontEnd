import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Meet from '../components/Meet';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { meetsApi } from '../shared/api';
import { thunderposts } from '../shared/data';
import Loading from '../layout/Loading';
import { useAllMeets } from '../react-query/hooks/useAllMeets';

const MeetsAll = () => {
  const {
    thunderPosts,
    areaSelected,
    setAreaSelected,
    setKeyword,
    isFetchingNextPage,
    fetchNextPage
  } = useAllMeets();

  const searchRef = useRef();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  const onSearch = () => {
    setKeyword(searchRef.current.value);
    searchRef.current.value = '';
  };

  return (
    <MeetAllContainer>
      <CategoryContainer>
        <select
          name="area"
          id="area"
          onChange={setAreaSelected}
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
        <div>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            ref={searchRef}
            onKeyPress={onKeyPress}
          />
        </div>
      </CategoryContainer>
      {thunderPosts.map((meet) => (
        <Meet key={meet.thunderpostId} meet={meet} />
      ))}
      {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
    </MeetAllContainer>
  );
};

const MeetAllContainer = styled.div`
  padding: 10px 0;
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

export default MeetsAll;
