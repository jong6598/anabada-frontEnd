import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDetailMeet } from '../react-query/hooks/useDetailMeet';

const Meet = ({ meet }) => {
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
    <MeetContinaer onClick={() => navigate(`/meets/${meet.thunderPostId}`)}>
      <LeftWrapper>
        <img src={meet.thumbnailUrl} alt="meetimg" />
      </LeftWrapper>
      <RightWrapper>
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
          <p className="endDate">~ {meet.endDate}</p>
        </div>
        <div className="titleDiv">
          <p>{meet.title}</p>
        </div>
        <div className="subBox">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 14.6673C8 14.6673 13 10.6673 13 6.33398C13 3.57255 10.7614 1.33398 8 1.33398C5.23857 1.33398 3 3.57255 3 6.33398C3 10.6673 8 14.6673 8 14.6673Z"
              fill="#C7C7CC"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M2.5 6.33398C2.5 3.29641 4.96242 0.833984 8 0.833984C11.0376 0.833984 13.5 3.29641 13.5 6.33398C13.5 8.67784 12.1577 10.8751 10.8884 12.4406C10.246 13.2328 9.60492 13.8844 9.12456 14.3381C8.88407 14.5652 8.68307 14.7435 8.54128 14.8657C8.47036 14.9268 8.41419 14.974 8.37523 15.0063C8.35575 15.0224 8.34057 15.0349 8.32998 15.0435L8.3176 15.0535L8.31407 15.0564L8.31298 15.0572L8.31261 15.0575C8.31247 15.0577 8.31235 15.0578 8 14.6673C7.68765 15.0578 7.68753 15.0577 7.68739 15.0575L7.68702 15.0572L7.68593 15.0564L7.6824 15.0535L7.67002 15.0435C7.65943 15.0349 7.64425 15.0224 7.62477 15.0063C7.58581 14.974 7.52964 14.9268 7.45872 14.8657C7.31693 14.7435 7.11593 14.5652 6.87544 14.3381C6.39508 13.8844 5.75396 13.2328 5.11162 12.4406C3.84231 10.8751 2.5 8.67784 2.5 6.33398ZM8 14.6673L7.68765 15.0578C7.87026 15.2038 8.12974 15.2038 8.31235 15.0578L8 14.6673ZM8 14.011C8.11918 13.906 8.26783 13.7718 8.43794 13.6111C8.89508 13.1794 9.50396 12.5602 10.1116 11.8108C11.3423 10.2929 12.5 8.32346 12.5 6.33398C12.5 3.84869 10.4853 1.83398 8 1.83398C5.51471 1.83398 3.5 3.84869 3.5 6.33398C3.5 8.32346 4.65769 10.2929 5.88838 11.8108C6.49604 12.5602 7.10492 13.1794 7.56206 13.6111C7.73217 13.7718 7.88081 13.906 8 14.011Z"
              fill="#C7C7CC"
            />
            <path
              d="M8 8.33398C9.10457 8.33398 10 7.43855 10 6.33398C10 5.22942 9.10457 4.33398 8 4.33398C6.89543 4.33398 6 5.22942 6 6.33398C6 7.43855 6.89543 8.33398 8 8.33398Z"
              fill="#FFFBFF"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.5 6.33398C5.5 4.95328 6.61929 3.83398 8 3.83398C9.38071 3.83398 10.5 4.95328 10.5 6.33398C10.5 7.71469 9.38071 8.83398 8 8.83398C6.61929 8.83398 5.5 7.71469 5.5 6.33398ZM8 4.83398C7.17158 4.83398 6.5 5.50556 6.5 6.33398C6.5 7.16241 7.17158 7.83398 8 7.83398C8.82842 7.83398 9.5 7.16241 9.5 6.33398C9.5 5.50556 8.82842 4.83398 8 4.83398Z"
              fill="#FFFBFF"
            />
          </svg>

          <p>{meet.address}</p>
        </div>
        <div className="subBox bottom">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.33301 8.5H11.333V12.5H7.33301V8.5Z" fill="#C7C7CC" />
            <path
              d="M12.6667 3.16634H11.3333V1.83301H10V3.16634H6V1.83301H4.66667V3.16634H3.33333C2.598 3.16634 2 3.76434 2 4.49967V13.833C2 14.5683 2.598 15.1663 3.33333 15.1663H12.6667C13.402 15.1663 14 14.5683 14 13.833V4.49967C14 3.76434 13.402 3.16634 12.6667 3.16634ZM12.6673 13.833H3.33333V5.83301H12.6667L12.6673 13.833Z"
              fill="#C7C7CC"
            />
          </svg>

          <p>{meet.meetDate}</p>
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
      </RightWrapper>
    </MeetContinaer>
  );
};

const MeetContinaer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.625rem;
  gap: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  /* width: 343px; */
  /* height: 7.438rem; */

  background: #ffffff;
  /* default */

  box-shadow: 0.0625rem 0.0625rem 0.5rem rgba(198, 198, 198, 0.42);
  border-radius: 0.5rem;

  /* Inside auto layout */

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const LeftWrapper = styled.div`
  img {
    width: 4.25rem;
    height: 4.25rem;

    background: url(.jpg), #d9d9d9;
    border-radius: 0.8125rem;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const RightWrapper = styled.div`
  display: block;
  flex-direction: column;

  div {
    display: flex;
    align-items: center;
    margin-bottom: 0.625rem;
    .dDay {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      padding: 0.125rem 0.25rem;
      gap: 0.625rem;
      margin-right: 0.75rem;

      /* width: 35px; */
      /* height: 21px; */

      background: #ff3b30;
      border-radius: 0.25rem;

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
      font-size: 0.8125rem;
      line-height: 143.84%;

      /* or 17px */

      color: #000000;
    }
  }

  .titleDiv {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 0.9375rem;
      line-height: 143.84%;
      /* identical to box height, or 22px */

      color: #000000;
    }
  }

  .subBox {
    margin-bottom: 0.5rem;
    svg {
      margin-right: 0.5rem;
    }
    p:first-child {
      font-style: normal;
      font-weight: 600;
      font-size: 0.8125rem;
      line-height: 1rem;
      /* identical to box height, or 19px */
      color: #000000;
    }
    svg:last-child {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 0.8125rem;

      /* identical to box height */
      margin-right: 0.625rem;
      color: #8e8e93;
    }
    p:last-child {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 0.8125rem;

      /* identical to box height */
      color: #8e8e93;
    }
  }
  .bottom {
    margin-bottom: 0;
  }
`;

export default Meet;
