import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
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
