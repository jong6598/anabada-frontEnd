import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Meet from "../../components/Meets/Meet";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { meetsApi } from "../../shared/api";
import Loading from "../../layout/Loading";

import { queryKeys } from "../../react-query/constants";
import { TbPencil } from "react-icons/tb";
import { Link } from "react-router-dom";
import NoData from "../../layout/NoData";

const MeetsAll = () => {
  const [search, setSearch] = useState(null);
  const [areaSelected, setAreaSelected] = useState("ALL");
  const accesstoken = localStorage.getItem("accessToken");

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
        !lastPage.last ? lastPage.nextPage : undefined,
    }
  );

  const searchRef = useRef();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(e);
    }
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeArea = (e) => {
    setAreaSelected(e.target.value);
  };

  return (
    <MeetAllContainer>
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
      {accesstoken && (
        <PostBtn>
          <Link to="/meetAdd">
            <TbPencil />
          </Link>
        </PostBtn>
      )}

      {data.pages[0].data.length === 0 && (
        <NoData text={"모임"} content={"모임"} />
      )}
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
    padding: 0.625rem;
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

export default MeetsAll;
