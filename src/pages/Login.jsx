import { useForm } from "react-hook-form";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { userAuth } from "../shared/api";
import { Cookies } from "react-cookie";
import { userThunk } from "../redux/auth-slice";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const Login = () => {
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
    try {
      const getResponse = await userAuth.login(loginData);
      // 토큰 저장
      cookies.set("refreshToken", getResponse.headers.refreshtoken);
      localStorage.setItem("accessToken", getResponse.headers.authorization);

      // 유저 정보 받아오기
      const getAccessToken = localStorage.getItem("accessToken");
      dispatch(userThunk(getAccessToken));
      navigate("/");
      return alertHandler("로그인에 성공했습니다!");
    } catch (err) {
      console.log(err);
      return alertHandler("이메일과 비밀번호를 확인해주세요!");
    }
  };
  const onError = (err) => {
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
      <FormWrapper>
        <LoginWelcome>
          <div>
            <img src="/assets/logo_big.svg"></img>
          </div>
        </LoginWelcome>
        <FormDiv>
          <form
            className="login__wrapper-form"
            onSubmit={handleSubmit(onSumbit, onError)}
          >
            <FormInput
              errors={errors.email}
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: true,
                pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
              })}
            ></FormInput>
            <FormInput
              errors={errors.password}
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: true,
              })}
            ></FormInput>
            <FormBtn>로그인</FormBtn>
          </form>
          <FormSection>
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
          </FormSection>
        </FormDiv>
      </FormWrapper>
    </>
  );
};

export default Login;

export const FormWrapper = styled.div`
  margin-top: 8.375rem;
`;

export const LoginWelcome = styled.section`
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      height: 4.93875rem;
      width: 13rem;
    }
  }
`;

export const FormDiv = styled.div`
  margin-top: 2.1875rem;
  padding: 0 2.625rem;
  .login__wrapper-form {
    display: flex;
    flex-direction: column;
  }
`;

export const FormInput = styled.input`
  margin-bottom: 0.5rem;
  background: #ffffff;
  border: 1px solid #d1d1d6;
  align-items: flex-start;
  padding: 12px 10px;
  border-radius: 0.3125rem;
  height: 2.5625rem;
  &:hover {
    background-color: #f2f2f4;
  }
  &:focus-visible {
    outline: 0.01rem solid #007aff;
  }
  outline: ${(props) => (props.errors ? "0.01rem solid #FF3B30" : "inherit")};
`;

export const FormBtn = styled.button`
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
  &:active {
    background-color: #026add;
  }
`;

const FormSection = styled.section`
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
`;
