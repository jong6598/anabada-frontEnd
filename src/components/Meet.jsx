import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Meet = ({ meet }) => {
  const navigate = useNavigate();

  return (
    <MeetContinaer onClick={() => navigate(`/meets/${meet.thunderpostId}`)}>
      <LeftWrapper>
        <img src={meet.thumbnailUrl} alt="meetimg" />
      </LeftWrapper>
      <RightWrapper>
        <div className="dateBox">
          <p className="dDay">D-{'12'}</p>
          <p className="endDate">{meet.endDate}</p>
        </div>
        <div>
          <p className="title">{meet.title}</p>
        </div>
        <div className="subBox">
          <p>장소</p>
          <p>
            {meet.area} {meet.address}
          </p>
        </div>
        <div className="subBox bottom">
          <p>인원</p>
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

  /* width: 343px; */
  /* height: 7.438rem; */

  background: #ffffff;
  /* default */

  box-shadow: 1px 1px 8px rgba(198, 198, 198, 0.42);
  border-radius: 8px;

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
    border-radius: 13px;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const RightWrapper = styled.div`
  display: flex;
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
      font-size: 15px;
      line-height: 143.84%;
      /* identical to box height, or 22px */

      color: #000000;
    }
  }
  .subBox {
    margin-bottom: 0.5rem;
    p:first-child {
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 1rem;
      /* identical to box height, or 19px */

      margin-right: 0.5rem;
      color: #000000;
    }
    p:last-child {
      font-family: 'Pretendard';
      font-style: normal;
      font-weight: 400;
      font-size: 0.813rem;
      line-height: 1rem;
      /* identical to box height */

      color: #8e8e93;
    }
  }
  .bottom {
    margin-bottom: 0;
  }
`;

export default Meet;
