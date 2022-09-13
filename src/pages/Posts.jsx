import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import Post from '../components/Post';
import { postApi } from '../shared/api';
import { useInView } from 'react-intersection-observer';
import { queryKeys } from '../react-query/constants';

import Loading from '../layout/Loading';
import NoData from '../layout/NoData';

import Masonry from 'react-masonry-css';
import SkeletonItem from '../layout/SkeletonItem';
import { TbPencil } from 'react-icons/tb';

const Posts = () => {
  const navigate = useNavigate();

  const { ref, inView } = useInView();
  const searchRef = useRef();
  const accesstoken = localStorage.getItem('accessToken');

  const [areaSelected, setAreaSelected] = useState('ALL');
  const [search, setSearch] = useState(null);

  const fetchPosts = async (pageParam, areaSelected, search) => {
    if (search) {
      try {
        const res = await postApi.getSearchPosts(
          pageParam,
          areaSelected,
          search
        );
        const data = res.data.content;
        const last = res.data.last;
        return { data, nextPage: pageParam + 1, last };
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await postApi.getPosts(pageParam, areaSelected);
        const data = res.data.content;
        const last = res.data.last;
        return { data, nextPage: pageParam + 1, last };
      } catch (err) {
        console.log(err);
        alert(err);
      }
    }
  };

  const { data, fetchNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(
      [queryKeys.posts, areaSelected, search],
      ({ pageParam = 0 }) => fetchPosts(pageParam, areaSelected, search),
      {
        getNextPageParam: (lastPage) =>
          !lastPage.last ? lastPage.nextPage : undefined
      }
    );

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

  // window.location.reload();

  const onSearch = (e) => {
    setSearch(e.target.value);
    searchRef.current.value = '';
  };

  const onChangeArea = (e) => {
    setAreaSelected(e.target.value);
  };

  const breakpoints = {
    default: 3,
    1100: 3,
    700: 2
  };

  return (
    <>
      <MainDiv>
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
        <PostDiv>
          {data.pages[0].data.length === 0 && (
            <NoData text={'게시물'} content={'게시물'} />
          )}
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {data.pages.map((page) => {
              return page.data.map((post) => (
                <PostContainer key={post.postId} style={{ cursor: 'pointer' }}>
                  {/* {!post && <SkeletonItem />} */}
                  <Post data={post} />
                </PostContainer>
              ));
            })}
          </Masonry>
          {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
        </PostDiv>
      </MainDiv>
      {accesstoken && (
        <PostBtn>
          <Link to="/posts/upload">
            <TbPencil />
          </Link>
        </PostBtn>
      )}
    </>
  );
};

export default Posts;

const MainDiv = styled.div`
  width: 100%;
`;

const PostDiv = styled.div`
  margin-top: 0.5rem;

  // mansory ui
  .my-masonry-grid {
    display: -webkit-box; /* Not needed if autoprefixing */
    display: -ms-flexbox; /* Not needed if autoprefixing */
    display: flex;

    /* margin-left: -30px; */
    width: auto;
  }
  .my-masonry-grid_column {
    /* padding-left: 10px; */
    padding: 0 5px;
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > div {
    /* change div to reference your elements you put in <Masonry> */

    margin-bottom: 10px;
  }
`;

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
    height: 40px;
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

const PostContainer = styled.div``;

const PostBtn = styled.div`
  position: fixed;
  bottom: 1.7rem;
  right: 2.3rem;
  z-index: 300;
  cursor: pointer;
  width: 60px;
  height: 60px;
  opacity: 0.9;

  background-color: #007aff;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 2rem;
    color: white;
    font-weight: 200;
  }
`;
