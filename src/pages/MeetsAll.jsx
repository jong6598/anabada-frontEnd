import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Meet from '../components/Meet';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { meetsApi } from '../shared/api';
import Loading, { InfiniteLoading } from '../layout/Loading';

import { queryKeys } from '../react-query/constants';
import Navigate from '../layout/Navigate';

const MeetsAll = () => {
  const [search, setSearch] = useState(null);
  const [areaSelected, setAreaSelected] = useState('ALL');

  const fetchPosts = async (pageParam, areaSelected, search) => {
    if (search) {
      try {
        const res = await meetsApi.getSearchPosts(
          pageParam,
          areaSelected,
          search
        );
        const data = res.data.content;
        const last = res.data.last;
        return { data, nextPage: pageParam + 1, last };
      } catch (error) {
        console.log(error.response);
      }
    } else {
      try {
        const res = await meetsApi.getMeetsPosts(pageParam, areaSelected);
        const data = res.data.content;
        const last = res.data.last;
        return { data, nextPage: pageParam + 1, last };
      } catch (error) {
        console.log(error.response);
      }
    }
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.allMeets, areaSelected, search],
    ({ pageParam = 0 }) => fetchPosts(pageParam, areaSelected, search),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.last ? lastPage.nextPage : undefined
    }
  );

  const searchRef = useRef();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(e);
    }
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    // searchRef.current.value = '';
  };

  const onChangeArea = (e) => {
    setAreaSelected(e.target.value);
  };

  return (
    <MeetAllContainer>
      <Navigate text={'오픈 모임 리스트'} />
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
        <input
          type="text"
          placeholder="검색어를 입력해주세요"
          ref={searchRef}
          onKeyPress={onKeyPress}
        />
      </CategoryContainer>
      {data.pages.map((page) => {
        return page.data.map((meet) => (
          <Meet key={meet.thunderPostId} meet={meet} />
        ));
      })}

      {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
    </MeetAllContainer>
  );
};

const MeetAllContainer = styled.div``;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.875rem 0;
  select {
    padding: 0.625rem 0;
    background: #ffffff;
    border: 1px solid #c7c7cc;
    border-radius: 4px;
    flex: none;
    order: 0;
    flex-grow: 0;
    outline: none;
  }

  input {
    font-weight: 400;
    font-size: 0.875rem;
    margin-left: 0.75rem;
    width: 100%;
    padding: 0.625rem 1rem;
    background-color: #f2f2f7;
    border-radius: 0.75rem;
  }
`;

export default MeetsAll;
