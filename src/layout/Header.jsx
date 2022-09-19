import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import { GrNotification } from 'react-icons/gr';
import { BsFillChatDotsFill } from 'react-icons/bs';

const Header = ({ notifications }) => {
  const location = useLocation();
  const { pathname } = location;
  const timer = useRef(null);
  const cookies = new Cookies();
  const getCookies = cookies.get('refreshToken');
  const [, setValueY] = useState(null);
  const gapY = useRef(0);

  // 헤더에 넣을 유저정보 받아오기
  const userInfo = useSelector((state) => state.auth);

  // scroll 이벤트 핸들러
  const handleScroll = () => {
    const { scrollY, visualViewport } = window;
    const { scrollHeight } = document.getElementById('root');
    setValueY((prev) => {
      // safari에서 bounce scroll 처리하기
      // 최상단
      if (scrollY < 20) {
        return (gapY.current = 0);
      }
      // 최하단
      if (scrollHeight <= scrollY + visualViewport.height + 20) {
        return (gapY.current = -50);
      }

      if (prev - scrollY > 0) {
        // 스크롤이 올라갈 때
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
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <HeaderWrapper style={{ marginTop: `${gapY.current}px` }}>
        <MainHeader pathname={pathname}>
          <Link to="/home">
            <div>
              <img src="/assets/logo_small.svg" alt=""></img>
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
            <Link className="header__nav__home" to="/home">
              서핑스팟
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
    </>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  background-color: white;
  position: fixed;
  z-index: 999;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px;

  @media screen and (min-width: 1024px) {
    width: 100vw;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
`;

const MainHeader = styled.div`
  @media screen and (min-width: 1024px) {
    width: 40vw;
    margin: 0 auto;
    left: 0;
    right: 0;
  }

  width: 100vw;
  height: 3.125rem;
  padding: 1rem 1rem;
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
    color: ${(props) => (props.pathname === '/signup' ? '#6486FF' : 'inherit')};
  }
  .header__user__login {
    color: ${(props) => (props.pathname === '/login' ? '#6486FF' : 'inherit')};
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

  @media screen and (min-width: 1024px) {
    width: 40vw;
    margin: 0 auto;
    left: 0;
    right: 0;
  }
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
    color: ${(props) => (props.pathname === '/home' ? '#2756FF' : 'inherit')};
    border-bottom: ${(props) =>
      props.pathname === '/home' ? '0.15rem solid #2756FF' : 'inherit'};
  }
  .header__nav__posting {
    display: flex;
    align-items: center;
    height: 100%;
    color: ${(props) => {
      return props.pathname.startsWith('/posts') ? '#2756FF' : 'inherit';
    }};
    border-bottom: ${(props) => {
      return props.pathname.startsWith('/posts')
        ? '0.15rem solid #2756FF'
        : 'inherit';
    }};
  }
  .header__nav__open {
    display: flex;
    align-items: center;
    height: 100%;
    color: ${(props) => {
      return props.pathname.startsWith('/meets') ? '#2756FF' : 'inherit';
    }};
    border-bottom: ${(props) => {
      return props.pathname.startsWith('/meets')
        ? '0.15rem solid #2756FF'
        : 'inherit';
    }};
  }
`;

const NotificationContainer = styled.div`
  position: relative;
  .notification__red {
    width: 0.4rem;
    height: 0.4rem;
    z-index: 999;
    background-color: ${(props) => (props.noti ? 'inherit' : 'red')};
    position: absolute;
    border-radius: 50px;
    bottom: 0;
    right: 0;
  }
`;
