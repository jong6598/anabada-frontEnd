import styled from 'styled-components';
import { FiInbox } from 'react-icons/fi';

const NoData = ({ text, content }) => {
  return (
    <NoDataDiv>
      <div>
        <FiInbox />
        <p>{`${text}이 없습니다.`}</p>
        <p>{`첫 ${content}을 작성해 보세요.`}</p>
      </div>
    </NoDataDiv>
  );
};

export default NoData;

const NoDataDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  div {
    text-align: center;
    color: #8e8e93;
  }
  p {
    margin: 0.3rem 0;
    font-style: normal;
    font-weight: 400;
    font-size: 1.063rem;
    line-height: 1.5rem;
  }
  svg {
    color: #d9d9d9;
    font-size: 3rem;
  }
`;