import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { userThunk } from "../redux/auth-slice";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import AlertToast from "./AlertToast";

const Header = memo(() => {
  const location = useLocation();
  const { pathname } = location;
  const timer = useRef(null);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const getCookies = cookies.get("refreshToken");
  const [valueY, setValueY] = useState(null);
  const gapY = useRef(0);

  // alert 메시지 커스텀
  const refErrorTimer = useRef(null);
  const refErrorMessage = useRef("");
  const [stateErrTimer, setStateErrTiemr] = useState(false);

  const alertHandler = useCallback(
    (errorMessage = "") => {
      console.log("errorMessage ::: ", errorMessage);
      console.log("stateErrTimer ::: ", stateErrTimer);
      if (refErrorTimer.current === null) {
        setStateErrTiemr(true);
        refErrorMessage.current = errorMessage;
        refErrorTimer.current = setTimeout(() => {
          setStateErrTiemr(false);
          return (refErrorTimer.current = null);
        }, 5000);
      }
    },
    [refErrorTimer]
  );

  // 새로고침 시 유저정보 리덕스에 재설정
  useEffect(() => {
    // 로그인 한 유저가 아니면 유저정보를 요청하지 않음
    if (getCookies === undefined) {
      return;
    } else {
      // 로그인 한 유저가 유저이면 새로고침 시 유저정보를 요청함
      const getAccess = localStorage.getItem("accessToken");
      dispatch(userThunk(getAccess));
    }
  }, []);
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

  console.log(getCookies);

  return (
    <>
      <HeaderWrapper style={{ marginTop: `${gapY.current}px` }}>
        <MainHeader pathname={pathname}>
          <Link to="/">
            <div>
              <svg
                width="80"
                height="25"
                viewBox="0 0 76 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_216_395)">
                  <path
                    d="M0 8.92002C0 7.2564 0.127841 5.85738 0.383524 4.72295C0.639206 3.58851 0.999784 2.67237 1.46526 1.97451C1.93073 1.27334 2.49454 0.770621 3.15997 0.463034C3.8254 0.155447 4.57278 0 5.40539 0C6.23799 0 6.98865 0.155447 7.66064 0.463034C8.33262 0.770621 8.90299 1.27334 9.36519 1.97451C9.83066 2.67567 10.1912 3.59182 10.4469 4.72295C10.7026 5.85738 10.8304 7.2564 10.8304 8.92002C10.8304 10.5836 10.7026 11.9827 10.4469 13.1171C10.1912 14.2515 9.83066 15.1677 9.36519 15.8655C8.89971 16.5634 8.33262 17.0694 7.66064 17.377C6.98865 17.6846 6.23472 17.84 5.40539 17.84C4.57606 17.84 3.8254 17.6846 3.15997 17.377C2.49454 17.0694 1.93073 16.5667 1.46526 15.8655C0.999784 15.1644 0.639206 14.2482 0.383524 13.1171C0.127841 11.9827 0 10.5836 0 8.92002H0ZM3.31731 8.03364L3.28126 8.08656C3.17636 8.24862 3.23864 8.47021 3.41565 8.54298C4.01225 8.79103 4.64817 8.97955 5.32344 9.10854C6.02165 9.24084 6.71658 9.31691 7.40168 9.33675C7.57213 9.34006 7.71308 9.19784 7.71308 9.02586V9.01263C7.71308 8.84395 7.57869 8.71165 7.41151 8.70504C6.72969 8.68519 6.07737 8.60251 5.45456 8.45699C4.83174 8.31146 4.23187 8.12955 3.67461 7.91457C3.54022 7.86496 3.39271 7.91127 3.31404 8.03033L3.31731 8.03364ZM16.7079 17.5457H11.7253C11.5549 17.5457 11.4205 17.4068 11.4205 17.2381V0.625096C11.4205 0.453112 11.5582 0.317509 11.7253 0.317509H16.7079C16.8783 0.317509 17.0127 0.456419 17.0127 0.625096V5.48365C17.0127 5.65563 17.1504 5.79123 17.3176 5.79123H18.2846C18.455 5.79123 18.5894 5.93014 18.5894 6.09882V10.4348C18.5894 10.6068 18.4517 10.7424 18.2846 10.7424H17.3176C17.1471 10.7424 17.0127 10.8813 17.0127 11.05V17.2315C17.0127 17.4035 16.875 17.5391 16.7079 17.5391V17.5457Z"
                    fill="#007AFF"
                  />
                  <path
                    d="M35.8447 17.5457H30.2394C30.0689 17.5457 29.9345 17.4068 29.9345 17.2381C29.9345 17.0198 29.7182 16.871 29.5182 16.9504C29.1806 17.0826 28.8134 17.2017 28.4168 17.3042C27.8464 17.4498 27.2302 17.5258 26.5647 17.5258H24.2144C23.231 17.5258 22.4214 17.4299 21.792 17.2414C21.1594 17.0529 20.6644 16.7618 20.3038 16.3716C19.9432 15.9813 19.6941 15.4951 19.5564 14.913C19.4188 14.3342 19.3499 13.6496 19.3499 12.8657V0.625092C19.3499 0.453108 19.4876 0.317505 19.6548 0.317505H25.1355C25.306 0.317505 25.4404 0.456415 25.4404 0.625092V11.2087C25.4404 11.4733 25.5256 11.6651 25.6994 11.7743C25.8731 11.8867 26.1058 11.943 26.3976 11.943C26.5779 11.943 26.8139 11.933 27.1056 11.9099C27.3974 11.89 27.7055 11.8504 28.03 11.7941C28.3545 11.7379 28.6856 11.6718 29.0167 11.5957C29.2756 11.5362 29.5182 11.4601 29.7444 11.3708C29.8591 11.3245 29.9345 11.2087 29.9345 11.083V0.625092C29.9345 0.453108 30.0722 0.317505 30.2394 0.317505H35.8447C36.0152 0.317505 36.1496 0.456415 36.1496 0.625092V5.48364C36.1496 5.65563 36.2872 5.79123 36.4544 5.79123H37.4214C37.5919 5.79123 37.7263 5.93014 37.7263 6.09882V10.4348C37.7263 10.6068 37.5886 10.7424 37.4214 10.7424H36.4544C36.284 10.7424 36.1496 10.8813 36.1496 11.05V17.2315C36.1496 17.4035 36.0119 17.5391 35.8447 17.5391V17.5457Z"
                    fill="#007AFF"
                  />
                  <path
                    d="M38.4802 13.7521V0.625092C38.4802 0.453108 38.6179 0.317505 38.785 0.317505H43.1448C43.3152 0.317505 43.4496 0.456415 43.4496 0.625092V3.78365C43.4496 3.95563 43.5873 4.09123 43.7545 4.09123H43.8266C43.997 4.09123 44.1314 3.95232 44.1314 3.78365V0.625092C44.1314 0.453108 44.2691 0.317505 44.4363 0.317505H48.796C48.9664 0.317505 49.1008 0.456415 49.1008 0.625092V17.2348C49.1008 17.4068 48.9632 17.5424 48.796 17.5424H42.2335C40.1585 17.5424 38.4736 15.8457 38.4736 13.7488L38.4802 13.7521ZM41.568 9.33344L41.532 9.38636C41.4271 9.54842 41.4894 9.77002 41.6664 9.84278C42.2728 10.0908 42.9448 10.2794 43.6791 10.4083C44.4396 10.5439 45.1673 10.6167 45.8655 10.6366C46.0359 10.6399 46.1769 10.4976 46.1769 10.3257V10.3124C46.1769 10.1438 46.0425 10.0115 45.8753 10.0048C45.1869 9.985 44.4986 9.90231 43.8135 9.75679C43.1218 9.60795 42.4957 9.42935 41.9286 9.21437C41.7942 9.16476 41.6467 9.21437 41.568 9.33013V9.33344ZM54.9783 17.5457H50.2022C50.0318 17.5457 49.8974 17.4068 49.8974 17.2381V0.625092C49.8974 0.453108 50.0351 0.317505 50.2022 0.317505H54.9783C55.1487 0.317505 55.2831 0.456415 55.2831 0.625092V5.48364C55.2831 5.65563 55.4208 5.79123 55.588 5.79123H56.555C56.7254 5.79123 56.8598 5.93014 56.8598 6.09882V10.4348C56.8598 10.6068 56.7221 10.7424 56.555 10.7424H55.588C55.4175 10.7424 55.2831 10.8813 55.2831 11.05V17.2315C55.2831 17.4035 55.1454 17.5391 54.9783 17.5391V17.5457Z"
                    fill="#007AFF"
                  />
                  <path
                    d="M57.6138 12.8657V0.625092C57.6138 0.453108 57.7515 0.317505 57.9187 0.317505H67.7264C67.8968 0.317505 68.0312 0.456415 68.0312 0.625092V5.19591C68.0312 5.33812 67.9362 5.4638 67.7985 5.49688C67.5494 5.55641 67.274 5.60602 66.9692 5.64902C66.566 5.70524 66.1497 5.75155 65.7203 5.78462C65.2908 5.821 64.8582 5.84415 64.4189 5.85738C64.0977 5.86731 63.7928 5.87392 63.5043 5.87723C63.3372 5.87723 63.2028 6.01614 63.2028 6.18482V11.6519C63.2028 11.8239 63.3404 11.9628 63.5109 11.9628C63.7731 11.9628 64.0813 11.9529 64.432 11.943C64.9303 11.9298 65.4515 11.8901 65.9923 11.8272C66.5332 11.7644 67.0577 11.6751 67.5625 11.556C67.9886 11.4568 68.3558 11.3278 68.6606 11.1724C68.7622 11.1194 68.8212 11.0136 68.8212 10.8978V0.625092C68.8212 0.453108 68.9589 0.317505 69.1261 0.317505H74.1086C74.2791 0.317505 74.4135 0.456415 74.4135 0.625092V5.48365C74.4135 5.65563 74.5511 5.79124 74.7183 5.79124H75.6853C75.8558 5.79124 75.9902 5.93015 75.9902 6.09882V10.4348C75.9902 10.6068 75.8525 10.7424 75.6853 10.7424H74.7183C74.5479 10.7424 74.4135 10.8813 74.4135 11.05V17.2315C74.4135 17.4035 74.2758 17.5391 74.1086 17.5391H69.1261C68.9556 17.5391 68.8212 17.4002 68.8212 17.2315V16.9901C68.8212 16.7751 68.6082 16.6262 68.4082 16.7023C68.2246 16.7685 68.0214 16.8346 67.8018 16.9008C67.3986 17.0198 66.9823 17.1257 66.5529 17.215C66.1235 17.3043 65.7006 17.3803 65.2843 17.4366C64.868 17.4928 64.5074 17.5192 64.2026 17.5192H62.4751C61.4917 17.5192 60.682 17.4233 60.0526 17.2348C59.42 17.0463 58.925 16.7552 58.5644 16.365C58.2039 15.9747 57.9547 15.4885 57.817 14.9064C57.6794 14.3276 57.6105 13.643 57.6105 12.8591L57.6138 12.8657Z"
                    fill="#007AFF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_216_395">
                    <rect width="76" height="17.8367" fill="white" />
                  </clipPath>
                </defs>
              </svg>
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
                <div className="header__user__info">
                  {userInfo?.nickname} 님 :)
                </div>
              </>
            )}
          </div>
        </MainHeader>
        <MainNav pathname={pathname}>
          <nav className="header__nav">
            <Link className="header__nav__home" to="/">
              메인홈
            </Link>
            <Link className="header__nav__posting" to="/posts">
              포스팅
            </Link>
            <Link className="header__nav__open" to="/meets">
              오픈 모임
            </Link>
          </nav>
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
  .header__nav {
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
  }
`;

const Layout = styled.div`
  padding: 5.5rem 1rem;
`;
