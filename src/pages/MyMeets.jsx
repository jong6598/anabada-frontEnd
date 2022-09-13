import styled from 'styled-components';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import Meet from '../components/Meet';
import { InView, useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { myApi } from '../shared/api';
import { queryKeys } from '../react-query/constants';
import Loading from '../layout/Loading';
import { css } from 'styled-components';
import NoData from '../layout/NoData';

const MyMeets = () => {
  const { ref, inView } = useInView();
  const location = useLocation();
  const [filter, setFilter] = useState(location.state);
  const [tab, setTab] = useState();

  const getMyMeets = async (pageParam = 0, filter) => {
    try {
      const res = await myApi.getMyMeets(filter, pageParam);
      const data = res.data.content;
      const last = res.data.last;
      return { data, nextPage: pageParam + 1, last };
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [queryKeys.myMeetsList, filter],
    ({ pageParam = 0 }) => getMyMeets(pageParam, filter),
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

  return (
    <>
      <BtnDiv>
        <button
          className={`btn ${tab === '1' ? 'active' : ''} `}
          onClick={() => {
            onClickFilter('myHostMeet');
            setTab('1');
          }}
        >
          <label>주최 모임</label>
        </button>
        <button
          className={`btn ${tab === '2' ? 'active' : ''} `}
          onClick={() => {
            onClickFilter('myJoinMeet');
            setTab('2');
          }}
        >
          <label>참석 모임</label>
        </button>
        <button
          className={`btn ${tab === '3' ? 'active' : ''} `}
          onClick={() => {
            onClickFilter('myLikeMeet');
            setTab('3');
          }}
        >
          <label>좋아요 모임</label>
        </button>
      </BtnDiv>

      <MeetAllContainer>
        {data.pages[0].data.length === 0 && (
          <NoData text={'모임'} content={'모임'} />
        )}
        {data &&
          data.pages.map((page) => {
            return page.data.map((meet) => (
              <Meet key={meet.thunderpostId} meet={meet} />
            ));
          })}
        {isFetchingNextPage ? <Loading /> : <div ref={ref}></div>}
      </MeetAllContainer>
    </>
  );
};

export default MyMeets;

const BtnDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1.1fr;
  column-gap: 0.5rem;
  margin: 0.625rem auto;
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

const MeetAllContainer = styled.div`
  padding: 0.625rem 0;
`;
