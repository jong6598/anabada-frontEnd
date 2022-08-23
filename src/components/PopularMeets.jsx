import React from 'react';
import styled from 'styled-components';

const PopularMeets = ({ popularPosts }) => {
  return (
    <PopularPostsContainer>
      <h2>인기모임🔥</h2>
      <div className="meetsBox">
        {popularPosts.map((meet) => (
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
  );
};

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

export default PopularMeets;
