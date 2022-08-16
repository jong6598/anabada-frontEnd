import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { userThunk } from "../redux/auth-slice";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const Header = () => {
  // 새로고침 시 유저정보 리덕스에 재설정
  const dispatch = useDispatch();
  useEffect(() => {
    // 로그인 한 유저가 아니면 유저정보를 요청하지 않음
    const cookies = new Cookies();
    if (cookies.get("refreshToken") === undefined) {
      return;
    } else {
      // 로그인 한 유저가 유저이면 새로고침 시 유저정보를 요청함
      const getAccess = localStorage.getItem("accessToken");
      dispatch(userThunk(getAccess));
    }
  }, []);

  return (
    <>
      <MainHeader>나 헤더임</MainHeader>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Header;

const MainHeader = styled.div`
  width: 100vw;
  height: 3rem;
  z-index: 1;
  background-color: whitesmoke;
`;

const Layout = styled.div`
  padding: 3rem;
  height: 200vw;
`;
