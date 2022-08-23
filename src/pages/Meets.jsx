import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { meetsApi } from '../shared/api';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import Meet from '../components/Meet';
import { thunderposts } from '../data';

// TODO: Infinite scroll function
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

const Meets = () => {
  const navigate = useNavigate();

  const onFilterArea = () => {};

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
      <CategoryContainer>
        <select name="area" id="area" onChange={onFilterArea}>
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
          <input type="text" placeholder="검색어를 입력해주세요." />
        </div>
      </CategoryContainer>
      {/* TODO: Slider, 분기, CSS 수정 */}
      <PopularPostsContainer>
        <h2>인기모임🔥</h2>
        <div className="meetsBox">
          {thunderposts.map((meet) => (
            <div className="meetBox" key={meet.thunderpostId}>
              <div className="meetImageWrapper">
                <img src={meet.thumbnailUrl} alt="" />
              </div>
              <div className="infoBox">
                <div className="dateBox">
                  <p className="dDay">D-{'12'}</p>
                  <p className="endDate">{meet.endDate}</p>
                </div>
                <div>
                  <p className="title">{meet.title}</p>
                </div>
                <img src={`thumbnailUrl`} alt="profileImage" />
                <div className="areaInfo">
                  🚩
                  <p>
                    {meet.area} {meet.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </PopularPostsContainer>
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

        {/* FIXME: 무한스크롤 구현 DATA로 변경. posts 5개만 보여줌
      {data.pages.map((page) =>
        page.thunderposts.map((meet) => <Meet key={meet.meetId} meet={meet} />)
      )} */}
        {thunderposts.map((meet) => (
          <Meet key={meet.thunderpostId} meet={meet} />
        ))}
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

const PopularPostsContainer = styled.div`
  margin-bottom: 1.625rem;
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 1.313rem;
    line-height: 143.84%;
    /* or 30px */
    margin: 0;
    color: #000000;
    margin-bottom: 0.625rem;
  }
  div.meetsBox {
    display: flex;
  }

  div.meetBox {
    margin-right: 1rem;
    border-radius: 13px;
  }
  div.meetImageWrapper {
    width: 100%;
    img {
      width: 12.375rem;
      height: 11.875rem;

      background: url(.jpg), #d9d9d9;
      border-radius: 13px;
    }
  }
  div.infoBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 0.5rem;

    /* width: 198px; */
    /* height: 135px; */

    background: #ffffff;
    /* default */

    box-shadow: 1px 1px 8px rgba(198, 198, 198, 0.42);
    border-radius: 13px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
  }

  .dDay {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0.125rem 0.25rem;
    gap: 10px;
    margin-right: 0.75rem;

    /* width: 35px; */
    /* height: 21px; */

    background: #ff3b30;
    border-radius: 4px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;

    font-style: normal;
    font-weight: 600;
    font-size: 0.75rem;
    line-height: 143.84%;
    /* or 17px */

    color: #ffffff;
  }
  .endDate {
    font-style: normal;
    font-weight: 300;
    font-size: 0.75rem;
    line-height: 143.84%;

    /* or 17px */

    color: #000000;
  }
  .title {
    font-style: normal;
    font-weight: 600;
    font-size: 0.938rem;
    line-height: 143.84%;
    /* identical to box height, or 22px */

    color: #000000;
  }

  div.dateBox {
    display: flex;
  }
  div.areaInfo {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #8e8e93;
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
  position: fixed;
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
