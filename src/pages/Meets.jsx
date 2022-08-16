import React, { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { meetsApi } from '../shared/api';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Meet from '../components/Meet';
import { meets } from '../data';

// TODO: Infinite scroll function
const fetchMeetsList = async (pageParam) => {
  try {
    const res = await meetsApi.getMeetsPosts(pageParam);
    if (res.status === 200) {
      console.log('Okay get Meets Posts');
      const { posts, isLast } = res.data;
      return { posts, nextPage: pageParam + 1, isLast };
    }
  } catch (error) {
    if (error.response.status === 404) {
      console.log('404 Error');
    }
  }
};

const Meets = () => {
  const navigate = useNavigate();

  // TODO: Infinite scroll
  // const { ref, inView } = useInView();
  // const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  //   ['meetsPosts'],
  //   ({ pageParam = 1 }) => fetchMeetsList(pageParam),
  //   {
  //     getNextPageParam: (lastPage) =>
  //       !lastPage.isLast ? lastPage.nextPage : undefined,
  //     suspense: true
  //   }
  // );

  // useEffect(() => {
  //   if (inView) fetchNextPage();
  // }, [inView]);

  return (
    <MeetsContainer>
      <button
        onClick={() => {
          navigate('/meetAdd');
        }}
      >
        모임 만들기
      </button>

      {/* FIXME: {data.pages.map((page) =>
        page.meets.map((meet) => <Meet key={meet.meetId} meet={meet} />)
      )} */}
      {meets.map((meet) => (
        <Meet key={meet.meetId} meet={meet} />
      ))}
    </MeetsContainer>
  );
};

const MeetsContainer = styled.div`
  button {
    background-color: black;
    color: white;
  }
`;

export default Meets;
