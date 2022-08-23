import styled from "styled-components";
const AlertToast = ({ errorMsg }) => {
  return (
    <>
      <AlertMessage>
        <span>{errorMsg}</span>
      </AlertMessage>
    </>
  );
};

export default AlertToast;

const AlertMessage = styled.div`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 17rem;
  text-align: center;
  z-index: 999;
  span {
    border-radius: 0.25rem;
    padding: 10px;
    background-color: #3a3a3a;
    font-size: 0.9rem;
    color: white;
  }
`;
