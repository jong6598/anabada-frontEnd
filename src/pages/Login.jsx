import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { userAuth } from "../shared/api";
import { Cookies } from "react-cookie";
import { userThunk } from "../redux/auth-slice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Login = () => {
  const [watchErr, setWatchErr] = useState(null);
  const { alertHandler } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    shouldFocusError: false,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const onSumbit = async (loginData) => {
    setWatchErr(null);
    try {
      const getResponse = await userAuth.login(loginData);
      // 토큰 저장
      cookies.set("refreshToken", getResponse.headers.refreshtoken);
      localStorage.setItem("accessToken", getResponse.headers.authorization);

      // 유저 정보 받아오기
      const getAccessToken = localStorage.getItem("accessToken");
      dispatch(userThunk(getAccessToken));
      navigate("/");
      return alert("로그인에 성공했습니다!");
    } catch (err) {
      setWatchErr(null);
      console.log(err);
      return alertHandler("이메일과 비밀번호를 확인해주세요!");
    }
  };
  const onError = (err) => {
    // 잘못된 input에 빨간 테두리 띄우기
    const redLine = { ...err };
    setWatchErr(redLine);
    // errors type에 따라 alertHandler 핸들
    if (errors.email?.type === "required") {
      alertHandler("이메일을 입력해주세요.");
    } else if (errors.email?.type === "pattern") {
      alertHandler("형식에 맞게 메일 주소를 입력하세요.");
    } else if (errors.password?.type === "required") {
      alertHandler("비밀번호를 입력해주세요.");
    }

    return console.log(err);
  };

  // 로그인한 상태에서 접근 시 차단
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      alertHandler("비정상적인 접근입니다.");
      return navigate("/");
    }
  }, []);

  return (
    <>
      <FormWrapper className="login__wrapper">
        <section className="login__wrapper-welcome__message">
          <h1>환영합니다!</h1>
          <br />
          <h1>로그인을 해주세요.</h1>
        </section>
        <FormDiv watchErr={watchErr}>
          <form
            className="login__wrapper-form"
            onSubmit={handleSubmit(onSumbit, onError)}
          >
            <input
              className="login__wrapper-input login__wrapper-input__login"
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
              })}
            ></input>
            <input
              className="login__wrapper-input login__wrapper-input__password"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: true,
              })}
            ></input>
            <button className="login__wrapper-btn">로그인</button>
          </form>
          <section className="login__wrapper-extra">
            <div className="login__wrapper-extra__btn__find">
              <span className="login__wrapper-extra__btn">아이디 찾기</span>
              <div className="header__user__divider">
                <div></div>
              </div>
              <span className="login__wrapper-extra__btn">비밀번호 찾기</span>
            </div>
            <div className="login__wrapper-extra__btn__signup">
              <Link to="/signup">
                <span className="login__wrapper-extra__btn">회원가입</span>
              </Link>
            </div>
          </section>
        </FormDiv>
      </FormWrapper>
    </>
  );
};

export default Login;

export const FormWrapper = styled.div`
  margin-top: 8.375rem;
  .login__wrapper-welcome__message {
    text-align: center;
    h1 {
      margin: 0 auto;
      font-weight: 400;
      font-size: 1.5625rem;
      color: #000000;
    }
    h1:last-child {
      margin-top: -0.9rem;
    }
  }
`;

export const FormDiv = styled.div`
  margin-top: 2.1875rem;
  padding: 0 2.625rem;
  .login__wrapper-form {
    display: flex;
    flex-direction: column;
    .login__wrapper-input {
      margin-bottom: 0.5rem;
      background: #ffffff;
      border: 1px solid #d1d1d6;
      align-items: flex-start;
      padding: 12px 10px;
      border-radius: 0.3125rem;
    }
    .login__wrapper-input:hover {
      background-color: #f2f2f4;
    }
    .login__wrapper-input:focus-visible {
      outline: 0.01rem solid #007aff;
    }
    .login__wrapper-input__login {
      outline: ${(props) =>
        props.watchErr?.email ? "0.01rem solid #FF3B30" : "inherit"};
    }
    .login__wrapper-input__password {
      outline: ${(props) =>
        props.watchErr?.password ? "0.01rem solid #FF3B30" : "inherit"};
    }
    .login__wrapper-btn {
      width: 100%;
      height: 2.5625rem;
      margin: 0 auto;
      border-radius: 0.3125rem;
      margin-top: 1.6875rem;
      margin-bottom: 1rem;
      border: none;
      background: #007aff;
      color: white;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
    }
    .login__wrapper-btn:focus {
      background-color: #026add;
    }
  }
  .login__wrapper-extra {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    font-weight: 400;
    font-size: 13px;
    color: #8e8e93;
    .login__wrapper-extra__btn {
      cursor: pointer;
    }
    .login__wrapper-extra__btn:hover {
      color: black;
    }

    .login__wrapper-extra__btn__find {
      display: flex;
    }

    // 헤더에 있는 거 가져옴
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
  }
`;
