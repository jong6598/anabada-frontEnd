import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { useInfiniteQuery } from '@tanstack/react-query';
import Post from "../components/Post";
import { postApi } from "../shared/api";
import { useInView } from "react-intersection-observer";
import { queryKeys } from "../react-query/constants";

import Loading from '../layout/Loading';
import NoData from '../layout/NoData';

const Posts = () => {
  const navigate = useNavigate();

  const { ref, inView } = useInView();
  const searchRef = useRef();
  const accesstoken=localStorage.getItem("accessToken")

  const [areaSelected, setAreaSelected] = useState('ALL');
  const [search, setSearch] = useState(null);


const fetchPosts = async (pageParam,areaSelected, search) => {
  console.log(search,'🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈')
  if (search) {
    try {
      console.log(search,'search 들어와잇냐?')
      const res = await postApi.getSearchPosts(areaSelected, search, pageParam);
      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      console.log('search 없이 요청')
      const res = await postApi.getPosts(pageParam, areaSelected)
      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }
}

const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  [queryKeys.postList, areaSelected,search],
  ({ pageParam = 0 }) => fetchPosts(pageParam,areaSelected,search),
  {
    getNextPageParam: (lastPage) =>
      !lastPage.last ? lastPage.nextPage : undefined,

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

  const onSearch = (e) => {
    setSearch(e.target.value);
    searchRef.current.value = '';
  };


  const onChangeArea = (e) => {
    setAreaSelected(e.target.value);
  };

  console.log(data,'data')

  return (
    <>
      <MainDiv>

        <TopDiv>
          <Areabar>
        <select onChange={onChangeArea} value={areaSelected}>
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
          </Areabar>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            ref={searchRef}
            onKeyPress={onKeyPress}
          />
        </TopDiv>
        <PostDiv>
          {data.pages[0].data.length === 0 &&(
            <NoData text={'게시물'} content={'게시물'}/>
          )}
          {
            (data.pages.map((page, idx) => {
              return (
                <React.Fragment key={idx}>
                  {page.data.map((post) => (
                    <PostContainer
                      key={post.postId}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(`/posts/${post.postId}`);
                      }}
                    >
                      <Post data={post} />
                    </PostContainer>
                  ))}
                </React.Fragment>
              );
            }))}
          {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
          
        </PostDiv>

      </MainDiv>
      {accesstoken&&
      <PostBtn>
      <Link to="/posts/upload">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_225_2066)">
            <rect x="5" y="5" width="56" height="56" rx="28" fill="#007AFF" />
            <path d="M23.6625 42.7501L27.905 42.7502L43.4613 27.1938L39.2187 22.9512L23.6624 38.5075L23.6625 42.7501Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M38.6884 22.4208C38.9813 22.1279 39.4561 22.1279 39.749 22.4208L43.9917 26.6635C44.1323 26.8041 44.2113 26.9949 44.2113 27.1938C44.2113 27.3927 44.1323 27.5835 43.9917 27.7241L28.4353 43.2805C28.2947 43.4211 28.1039 43.5002 27.905 43.5002L23.6625 43.5001C23.2483 43.5 22.9125 43.1643 22.9125 42.7501L22.9124 38.5075C22.9123 38.3086 22.9914 38.1178 23.132 37.9772L38.6884 22.4208ZM39.2187 24.0118L24.4124 38.8182L24.4125 42.0001L27.5943 42.0001L42.4007 27.1938L39.2187 24.0118Z" fill="white" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.4457 26.6635C34.7386 26.3706 35.2135 26.3706 35.5064 26.6635L39.749 30.9062C40.0419 31.1991 40.0419 31.6739 39.749 31.9668C39.4561 32.2597 38.9813 32.2597 38.6884 31.9668L34.4457 27.7242C34.1528 27.4313 34.1528 26.9564 34.4457 26.6635Z" fill="white" />
          </g>
          <defs>
            <filter id="filter0_d_225_2066" x="0" y="0" width="70" height="70" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="2" dy="2" />
              <feGaussianBlur stdDeviation="3.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_225_2066" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_225_2066" result="shape" />
            </filter>
          </defs>
        </svg>
      </Link>
    </PostBtn>
    }   
    </>
  )
}


export default Posts;

const MainDiv = styled.div`
  width: 100%;
 
`

const PostDiv = styled.div`
  margin: 0.625rem auto;
  flex-wrap: wrap;
  columns: auto 2;
  column-gap: 1rem;
`

const TopDiv = styled.div`
  display: flex;
  input{
    background-color: #F2F2F7;
    border: 0;
    border-radius: 2.625rem;
    margin-left: 0.75rem;
    height: 2.375rem;
    margin-top: 0.9375rem;
    width: 100%;
    padding-left: 0.9375rem;
  }
`



const Areabar = styled.div`
    height: 3.75rem;
    padding: 0.875rem, 1rem, 0.5rem, 1rem;

  select{
    border-radius: 0.25rem;
    margin-top: 0.9375rem;
    padding: 0.625rem;
    gap: 0.188rem;
    background: #ffffff;
    border: 0.0625rem solid #c7c7cc;
  }
`

const PostContainer = styled.div`
    display: inline-block;

`


const PostBtn = styled.div` 
  cursor: pointer;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  `




