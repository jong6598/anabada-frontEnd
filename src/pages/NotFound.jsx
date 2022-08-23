import styled from "styled-components";

const NotFound = () => {
  return (
    <>
      <NotFoundDiv>
        <span>::: 404 :::</span>
        <br />
        <span className="joke">이곳에서는 서핑을 할 수 없습니다!</span>
      </NotFoundDiv>
    </>
  );
};
export default NotFound;

const NotFoundDiv = styled.div`
  margin-top: 12rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: 600;
  color: #007aff;
  .joke {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;
