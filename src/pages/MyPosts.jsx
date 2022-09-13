import React, { useState, useEffect } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { InView, useInView } from 'react-intersection-observer';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { myApi } from '../shared/api';
import { queryKeys } from '../react-query/constants';
import Loading from '../layout/Loading';
import Post from '../components/Post';
import NoData from '../layout/NoData';
import Masonry from 'react-masonry-css';

const MyPosts = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const location = useLocation();
  const [filter, setFilter] = useState(location.state);
  const [tab, setTab] = useState();

  const getMyPosts = async (pageParam = 0, filter) => {
    try {
      const res = await myApi.getMyPosts(filter, pageParam);
      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (err) {
      alert(err);
    }
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.myPostsList, filter],
    ({ pageParam = 0 }) => getMyPosts(pageParam, filter),
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

  const onClickFilter = (data) => {
    setFilter(data);
  };

  const breakpoints = {
    default: 3,
    1100: 3,
    700: 2
  };

  return (
    <>
      <BtnDiv>
        <button
          className={`btn ${tab === '1' ? 'active' : ''} `}
          onClick={() => {
            onClickFilter('myWritePost');
            setTab('1');
          }}
        >
          <label>작성 피드</label>
        </button>
        <button
          className={`btn ${tab === '2' ? 'active' : ''} `}
          onClick={() => {
            onClickFilter('myLikePost');
            setTab('2');
          }}
        >
          <label>좋아요 피드</label>
        </button>
      </BtnDiv>

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
              <PostContainer
                key={post.postId}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate(`/posts/${post.postId}`);
                }}
              >
                <Post data={post} />
              </PostContainer>
            ));
          })}
        </Masonry>
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </PostDiv>
    </>
  );
};

export default MyPosts;

const BtnDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.5rem;
  margin: 0.625rem auto;
  flex-wrap: wrap;
  button {
    border-radius: 2.875rem;
    color: #007aff;
    font-size: 0.875rem;
    font-weight: 600;
    border: 0.0625rem solid #007aff;
    padding: 0.725rem 1.708125rem;
  }
  .btn.active {
    color: white;
    background-color: #007aff;
  }
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

const PostContainer = styled.div`
  /* display: inline-block; */
  /* box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px 0px; */
`;
