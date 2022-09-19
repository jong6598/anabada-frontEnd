import styled from 'styled-components';
import Header from '../../layout/Header';

const NotFound = () => {
  return (
    <>
      <Header />
      <NotFoundDiv>
        <div>
          <span>::: 404 :::</span>
          <br />
          <span className="joke">이곳에서는 서핑을 할 수 없습니다!</span>
        </div>
      </NotFoundDiv>
    </>
  );
};
export default NotFound;

const NotFoundDiv = styled.div`
  width: 100vw;
  padding-top: 20rem;
  display: flex;

  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  color: #007aff;
  .joke {
    font-size: 1.5rem;
    font-weight: 500;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
