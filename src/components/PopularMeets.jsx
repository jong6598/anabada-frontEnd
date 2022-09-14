import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const PopularMeets = ({ popularPosts }) => {
  const navigate = useNavigate();
  const difference = useCallback((date1, date2) => {
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    const day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
  }, []);

  let time = new Date().toISOString();
  const date1 = new Date(time.slice(0, 10));

  return (
    <PopularPostsContainer>
      <h2>인기모임🔥</h2>
      <div className="meetsBox">
        {popularPosts.map((meet) => (
          <div
            className="meetBox"
            key={meet.thunderPostId}
            onClick={() => navigate(`/meets/${meet.thunderPostId}`)}
          >
            <div className="meetImageWrapper">
              <img src={meet.thumbnailUrl} alt="thumbnail" />
            </div>
            <div className="infoBox">
              <div className="dateBox">
                {difference(date1, new Date(meet.endDate)) >= 0 ? (
                  <p className="dDay">
                    D-
                    {difference(date1, new Date(meet.endDate)) === 0
                      ? 'Day'
                      : difference(date1, new Date(meet.endDate))}
                  </p>
                ) : (
                  <p className="dayClosing">마감</p>
                )}
                <p className="endDate"></p>
              </div>

              <div className="title">{meet.title}</div>

              <div className="areaInfo">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 15.1663C8 15.1663 13 11.1663 13 6.83301C13 4.07157 10.7614 1.83301 8 1.83301C5.23857 1.83301 3 4.07157 3 6.83301C3 11.1663 8 15.1663 8 15.1663Z"
                    fill="#C7C7CC"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.5 6.83301C2.5 3.79543 4.96242 1.33301 8 1.33301C11.0376 1.33301 13.5 3.79543 13.5 6.83301C13.5 9.17687 12.1577 11.3741 10.8884 12.9396C10.246 13.7318 9.60492 14.3835 9.12456 14.8371C8.88407 15.0643 8.68307 15.2425 8.54128 15.3647C8.47036 15.4259 8.41419 15.473 8.37523 15.5053C8.35575 15.5215 8.34057 15.5339 8.32998 15.5425L8.3176 15.5526L8.31407 15.5554L8.31298 15.5563L8.31261 15.5566C8.31247 15.5567 8.31235 15.5568 8 15.1663C7.68765 15.5568 7.68753 15.5567 7.68739 15.5566L7.68702 15.5563L7.68593 15.5554L7.6824 15.5526L7.67002 15.5425C7.65943 15.5339 7.64425 15.5215 7.62477 15.5053C7.58581 15.473 7.52964 15.4259 7.45872 15.3647C7.31693 15.2425 7.11593 15.0643 6.87544 14.8371C6.39508 14.3835 5.75396 13.7318 5.11162 12.9396C3.84231 11.3741 2.5 9.17687 2.5 6.83301ZM8 15.1663L7.68765 15.5568C7.87026 15.7029 8.12974 15.7029 8.31235 15.5568L8 15.1663ZM8 14.51C8.11918 14.4051 8.26783 14.2708 8.43794 14.1101C8.89508 13.6784 9.50396 13.0592 10.1116 12.3098C11.3423 10.7919 12.5 8.82248 12.5 6.83301C12.5 4.34772 10.4853 2.33301 8 2.33301C5.51471 2.33301 3.5 4.34772 3.5 6.83301C3.5 8.82248 4.65769 10.7919 5.88838 12.3098C6.49604 13.0592 7.10492 13.6784 7.56206 14.1101C7.73217 14.2708 7.88081 14.4051 8 14.51Z"
                    fill="#C7C7CC"
                  />
                  <path
                    d="M8 8.83301C9.10457 8.83301 10 7.93757 10 6.83301C10 5.72844 9.10457 4.83301 8 4.83301C6.89543 4.83301 6 5.72844 6 6.83301C6 7.93757 6.89543 8.83301 8 8.83301Z"
                    fill="#FFFBFF"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.5 6.83301C5.5 5.4523 6.61929 4.33301 8 4.33301C9.38071 4.33301 10.5 5.4523 10.5 6.83301C10.5 8.21372 9.38071 9.33301 8 9.33301C6.61929 9.33301 5.5 8.21372 5.5 6.83301ZM8 5.33301C7.17158 5.33301 6.5 6.00458 6.5 6.83301C6.5 7.66143 7.17158 8.33301 8 8.33301C8.82842 8.33301 9.5 7.66143 9.5 6.83301C9.5 6.00458 8.82842 5.33301 8 5.33301Z"
                    fill="#FFFBFF"
                  />
                </svg>
                <p>{meet.area}</p>
              </div>
              <div className="subBox bottom">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.33301 8.5H11.333V12.5H7.33301V8.5Z"
                    fill="#C7C7CC"
                  />
                  <path
                    d="M12.6667 3.16634H11.3333V1.83301H10V3.16634H6V1.83301H4.66667V3.16634H3.33333C2.598 3.16634 2 3.76434 2 4.49967V13.833C2 14.5683 2.598 15.1663 3.33333 15.1663H12.6667C13.402 15.1663 14 14.5683 14 13.833V4.49967C14 3.76434 13.402 3.16634 12.6667 3.16634ZM12.6673 13.833H3.33333V5.83301H12.6667L12.6673 13.833Z"
                    fill="#C7C7CC"
                  />
                </svg>

                <p>{meet.meetDate}</p>
              </div>
              <div className="subBox">
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33398 8.49935C7.80465 8.49935 9.00065 7.30335 9.00065 5.83268C9.00065 4.36202 7.80465 3.16602 6.33398 3.16602C4.86332 3.16602 3.66732 4.36202 3.66732 5.83268C3.66732 7.30335 4.86332 8.49935 6.33398 8.49935ZM7.33398 9.16602H5.33398C3.12798 9.16602 1.33398 10.96 1.33398 13.166V13.8327H11.334V13.166C11.334 10.96 9.53998 9.16602 7.33398 9.16602Z"
                    fill="#C7C7CC"
                  />
                  <path
                    d="M11.0697 7.86466C11.4757 7.17272 11.6511 6.36953 11.5704 5.57133C11.451 4.38199 10.787 3.33066 9.70171 2.61133L8.96504 3.72199C9.71104 4.21666 10.165 4.92133 10.2437 5.70466C10.28 6.06873 10.2347 6.4363 10.111 6.78065C9.98741 7.125 9.78859 7.43747 9.52904 7.69533L8.73438 8.48999L9.81304 8.80666C12.6344 9.63333 12.667 12.4707 12.667 12.4993H14.0004C14.0004 11.3067 13.363 8.97599 11.0697 7.86466Z"
                    fill="#C7C7CC"
                  />
                </svg>
                <p>
                  {meet.currentMember} / {meet.goalMember}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PopularPostsContainer>
  );
};

const PopularPostsContainer = styled.div`
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
    min-width: 14.375rem;
    max-height: 21.5rem;
    margin-right: 1rem;
    border-radius: 13px;

    cursor: pointer;
    &:hover {
      background: #f7faff;
    }
  }
  div.meetImageWrapper {
    width: 100%;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 13px;
    position: relative;

    img {
      width: 100%;
      height: 11.875rem;
      object-fit: cover;

      border-radius: 13px;
    }
  }
  div.infoBox {
    bottom: 2rem;
    display: flex;
    position: relative;

    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
    gap: 0.5rem;
    cursor: pointer;
    /* width: 198px;
    height: 135px; */

    background: #ffffff;
    /* default */

    box-shadow: 1px 1px 8px rgba(198, 198, 198, 0.42);
    border-radius: 13px;

    /* Inside auto layout */

    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;

    width: 100%;
  }
  .title {
    width: 100%;
    display: block;
    display: -webkit-box;

    -webkit-line-clamp: 2; //원하는 라인수
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
    overflow: hidden;
    text-overflow: ellipsis;

    font-weight: 600;
    font-size: 0.9rem;
  }

  .dDay {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0.125rem 0.25rem;
    gap: 0.625rem;
    margin-right: 0.75rem;

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
  .dayClosing {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0.125rem 0.25rem;
    gap: 0.625rem;
    margin-right: 0.75rem;

    /* width: 35px; */
    /* height: 21px; */

    background: black;
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
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 143.84%;

    /* or 17px */

    color: #000000;
  }

  div.dateBox {
    display: flex;
    align-items: center;
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
    svg {
      margin-right: 0.5rem;
    }
  }
  div.subBox {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    display: flex;
    align-items: center;
    color: #8e8e93;
    svg {
      margin-right: 0.5rem;
    }
  }
`;

export default PopularMeets;
