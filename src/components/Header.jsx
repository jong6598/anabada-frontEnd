import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import AlertToast from "./AlertToast";

import { MdOutlineNotificationsNone } from "react-icons/md";
import { GrNotification } from "react-icons/gr";
import { BsFillChatDotsFill } from "react-icons/bs";

const Header = memo(({ notifications }) => {
  const location = useLocation();
  const { pathname } = location;
  const timer = useRef(null);
  // const dispatch = useDispatch();
  const cookies = new Cookies();
  const getCookies = cookies.get("refreshToken");
  const [valueY, setValueY] = useState(null);
  const gapY = useRef(0);

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

  // 헤더에 넣을 유저정보 받아오기
  const userInfo = useSelector((state) => state.auth);

  // scroll 이벤트 핸들러
  const handleScroll = () => {
    const { scrollY } = window;
    setValueY((prev) => {
      // 스크롤이 올라갈 때
      if (prev - scrollY > 0) {
        // gapY.current가 0이면 더 더하지 말기
        if (gapY.current >= 0) {
          timer.current = null;
          return scrollY;
        } else {
          gapY.current += Math.abs(prev - scrollY);
          // 초과했으면 바꿔주기
          if (gapY.current > 0) {
            gapY.current = 0;
          }
          timer.current = null;
          return scrollY;
        }
      }
      // 스크롤이 내려갈 때
      else if (prev - scrollY < 0) {
        // gapY.current가 -50이면 더 빼지 말기
        if (gapY.current <= -50) {
          timer.current = null;
          return scrollY;
        } else {
          gapY.current -= Math.abs(prev - scrollY);
          // 초과했으면 바꿔주기
          if (gapY.current < -50) {
            gapY.current = -50;
          }
          timer.current = null;
          return scrollY;
        }
      }
    });
  };

  // 스크롤 이벤트 바인딩
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <HeaderWrapper style={{ marginTop: `${gapY.current}px` }}>
        <MainHeader pathname={pathname}>
          <Link to="/">
            <div>
              <img src="/assets/logo_small.svg"></img>
            </div>
          </Link>
          <div className="header__user">
            {getCookies === undefined ? (
              <>
                <Link to="/login">
                  <div className="header__user__login">로그인</div>
                </Link>
                <div className="header__user__divider">
                  <div></div>
                </div>
                <Link to="/signup">
                  <div className="header__user__signup">회원가입</div>
                </Link>
              </>
            ) : (
              <>
                <div className="header__user__info header__user__info-islogin">
                  <Link to="/notifications">
                    <NotificationContainer noti={notifications?.isBadge}>
                      <GrNotification />
                      <div className="notification__red"></div>
                    </NotificationContainer>
                  </Link>
                  <Link to="/room">
                    <BsFillChatDotsFill />
                  </Link>
                  <Link to="/mypage">
                    <img src={userInfo.profileImg} alt="" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </MainHeader>
        <MainNav>
          <NavElement pathname={pathname}>
            <Link className="header__nav__home" to="/">
              메인홈
            </Link>
            <Link className="header__nav__posting" to="/posts">
              포스팅
            </Link>
            <Link className="header__nav__open" to="/meets">
              오픈 모임
            </Link>
          </NavElement>
        </MainNav>
      </HeaderWrapper>

      <Layout>
        {stateErrTimer && <AlertToast errorMsg={refErrorMessage.current} />}
        <Outlet context={{ alertHandler }} />
      </Layout>
    </>
  );
});

export default Header;

const HeaderWrapper = styled.div`
  background-color: white;
  position: fixed;
  z-index: 999;
`;

const MainHeader = styled.div`
  width: 100vw;
  height: 3.125rem;
  padding: 1rem 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    width: 4.75rem;
    height: 1.115rem;
    cursor: pointer;
  }
  .header__user,
  .header__user__info {
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: left;

    display: flex;
    justify-content: center;
    align-items: center;

    .header__user__info-islogin {
      a {
        margin-left: 1.2rem;
      }
    }

    svg {
      width: auto;
      width: 20px;
      height: 20px;
      color: #363636;
    }

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
  .header__user__login,
  .header__user__signup,
  .header__user__info {
    cursor: pointer;
  }
  .header__user__signup {
    color: ${(props) => (props.pathname === "/signup" ? "#6486FF" : "inherit")};
  }
  .header__user__login {
    color: ${(props) => (props.pathname === "/login" ? "#6486FF" : "inherit")};
  }
  .header__user__divider {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1rem;
    div {
      height: 0.5rem;
      width: 1px;
      border-radius: 1rem;
      background-color: #c7c7cc;
    }
  }
`;

const MainNav = styled.div`
  width: 100vw;
  height: 2.375rem;
  padding: 0rem 1.375rem;
  font-size: 0.9375rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.6px;
`;

const NavElement = styled.nav`
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  .header__nav__home {
    display: flex;
    align-items: center;

    height: 100%;
    color: ${(props) => (props.pathname === "/" ? "#2756FF" : "inherit")};
    border-bottom: ${(props) =>
      props.pathname === "/" ? "0.15rem solid #2756FF" : "inherit"};
  }
  .header__nav__posting {
    display: flex;
    align-items: center;
    height: 100%;
    color: ${(props) => (props.pathname === "/posts" ? "#2756FF" : "inherit")};
    border-bottom: ${(props) =>
      props.pathname === "/posts" ? "0.15rem solid #2756FF" : "inherit"};
  }
  .header__nav__open {
    display: flex;
    align-items: center;
    height: 100%;
    color: ${(props) => (props.pathname === "/meets" ? "#2756FF" : "inherit")};
    border-bottom: ${(props) =>
      props.pathname === "/meets" ? "0.15rem solid #2756FF" : "inherit"};
  }
`;

const Layout = styled.div`
  padding: 5.5rem 1rem;
`;

const NotificationContainer = styled.div`
  position: relative;
  .notification__red {
    width: 0.4rem;
    height: 0.4rem;
    z-index: 999;
    background-color: ${(props) => (props.noti ? "inherit" : "red")};
    position: absolute;
    border-radius: 50px;
    bottom: 0;
    right: 0;
  }
`;
