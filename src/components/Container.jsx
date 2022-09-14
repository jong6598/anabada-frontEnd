import { useCallback, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import AlertToast from "./AlertToast";

const Container = () => {
  // alert 메시지 커스텀
  /**
   * 사용할 컴포넌트에서 const { alertHandler } = useOutletContext(); 로 호출해서 alertHandler("여기에 메시지를 넣으면 된다.")
   */
  const refErrorTimer = useRef(null);
  const refErrorMessage = useRef("");
  const [stateErrTimer, setStateErrTiemr] = useState(false);
  const alertHandler = useCallback(
    (errorMessage = "") => {
      if (refErrorTimer.current === null) {
        setStateErrTiemr(true);
        refErrorMessage.current = errorMessage;
        refErrorTimer.current = setTimeout(() => {
          setStateErrTiemr(false);
          return (refErrorTimer.current = null);
        }, 3500);
      }
    },
    [refErrorTimer]
  );
  return (
    <>
      <Layout>
        {stateErrTimer && <AlertToast errorMsg={refErrorMessage.current} />}
        <Outlet context={{ alertHandler }} />
      </Layout>
    </>
  );
};

export default Container;

const Layout = styled.div`
  padding: 5.5rem 1rem;

  @media screen and (min-width: 1024px) {
    width: 40vw;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
`;
