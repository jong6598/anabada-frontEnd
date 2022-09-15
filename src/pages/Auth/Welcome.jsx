import { LoginWelcome } from "./Login";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Cookies } from "react-cookie";

const Welcome = () => {
  const timer = useRef(null);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const { alertHandler } = useOutletContext();
  let [intervalSeconds, setIntervalSeconds] = useState(3);
  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      if (timer.current === null) {
        timer.current = setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      return setIntervalSeconds((prev) => (prev -= 1));
    }, 1000);
    return () => {
      clearTimeout(timer.current);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 로그인한 상태에서 접근 시 차단
  useEffect(() => {
    if (localStorage.getItem("accessToken") && cookies.get("refreshToken")) {
      alertHandler("비정상적인 접근입니다.");
      return navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SignupWelcome>
        <h1>환영합니다!</h1>
        <br />
        <h1>회원가입이 완료되었습니다.</h1>
        <h5>{`${intervalSeconds}초 뒤 로그인 페이지로 이동합니다.`}</h5>
      </SignupWelcome>
    </>
  );
};

export default Welcome;

const SignupWelcome = styled(LoginWelcome)`
  margin-top: 17.1875rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
