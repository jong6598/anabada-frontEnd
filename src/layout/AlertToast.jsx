import styled, { keyframes } from 'styled-components';
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

const alertAnimation = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95%{
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const AlertMessage = styled.div`
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 17rem;
  text-align: center;
  z-index: 999;
  animation: ${alertAnimation} 5s ease-in-out;
  span {
    border-radius: 0.25rem;
    padding: 10px;
    background-color: #3a3a3a;
    font-size: 0.9rem;
    color: white;
  }
`;
