import React, { useEffect } from 'react';
import styled from 'styled-components';
import Meet from '../components/Meet';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { meetsApi } from '../shared/api';
import { thunderposts } from '../data';

const fetchMeetsList = async (pageParam, area) => {
  try {
    const res = await meetsApi.getMeetsPosts(pageParam, area);
    // if (res.status === 200) {}
    console.log('Okay get Meets Posts');
    const { posts, isLast } = res.data;
    return { posts, nextPage: pageParam + 1, isLast };
  } catch (error) {
    // if (error.response.status === 404) {}
    console.log('404 Error');
  }
};

const MeetsAll = () => {
  // TODO: infinite scroll
  // const { ref, inView } = useInView();
  // const { data:thunderposts, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
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
    <MeetAllContainer>
      {thunderposts.map((meet) => (
        <Meet key={meet.thunderpostId} meet={meet} />
      ))}
      {/* {isFetchingNextPage ? <Loading/> : <div ref={ref}></div>} */}
    </MeetAllContainer>
  );
};

const MeetAllContainer = styled.div`
  padding: 10px 0;
`;

export default MeetsAll;
