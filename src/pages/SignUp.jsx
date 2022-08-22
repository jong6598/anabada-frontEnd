import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../shared/api";
import { FormWrapper, FormDiv } from "./Login";
import PageTitle from "../components/PageTitle";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "onBlur",
  });
  const [emailState, setEmailState] = useState(false);

  const navigate = useNavigate();

  const onSumbit = (signupData) => {
    try {
      const getResponse = (async () => await userAuth.signup(signupData))();
      return navigate("/login");
    } catch (err) {
      console.log(err);
      return alert("서버와 통신에 실패했습니다. 다시 시도해주세요.");
    }
  };
  const onError = (err) => {
    console.log(err);
    if (!emailState) {
      return alert("중복확인을 해주세요.");
    }
    return alert("유효하지 않은 형식입니다. 다시 확인해주세요.");
  };

  useEffect(() => {
    setEmailState(!dirtyFields.email);
  }, [dirtyFields.email]);

  // 중복체크
  // test
  /*   const handleEmailValidation = async () => {
    dirtyFields.email = false;
    setEmailState(true);
    console.log("dirtyFields ::: ", dirtyFields);
    console.log("emailState ::: ", emailState);
  }; */

  const handleEmailValidation = async () => {
    if (errors.email.type === "pattern") {
      return alert("올바른 이메일 형식이 아닙니다.");
    }
    try {
      const email = getValues("email");
      const response = await userAuth.emailValidation(email);
      if (response.status === 200) {
        dirtyFields.email = false;
        setEmailState(true);
        return alert("계속 진행해주세요!");
      }
    } catch (err) {
      console.log(err);
      // 중복체크 실패했을 때
      if (err.response.status === 409) {
        return alert("존재하는 이메일 입니다!");
      }
      // 이메일 형식이 아닐 때
      if (err.response.data === "올바른 형식의 이메일 주소여야 합니다") {
        return alert(err.response.data);
      }
      return alert("서버와 통신에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 로그인한 상태에서 접근 시 차단
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      alert("비정상적인 접근입니다.");
      return navigate("/");
    }
  }, []);

  return (
    <>
      <SignupWrapper>
        <SignupForm>
          <form
            className="login__wrapper-form"
            onSubmit={handleSubmit(onSumbit, onError)}
          >
            <div className="login__input__title">
              <span>이메일</span>
            </div>
            {errors.email?.type === "required" && (
              <span className="login__wrapper__error">
                {errors.email.message}
              </span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="login__wrapper__error">
                형식에 맞게 메일 주소를 입력하세요.
              </span>
            )}
            {errors.email?.type === "validate" && !emailState && (
              <span className="login__wrapper__error">
                {errors.email.message}
              </span>
            )}
            <input
              className="login__wrapper-input login__wrapper-input__login"
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요!",
                pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
                validate: () => emailState || "중복확인을 해주세요!",
              })}
            ></input>
            <div
              className="login__wrapper-verification"
              emailState={emailState}
              onClick={handleEmailValidation}
            >
              중복체크
            </div>
            <div className="login__input__title">
              <span>비밀번호</span>
            </div>
            {errors.password ? (
              (errors.password?.type === "required" && (
                <span className="login__wrapper__error">
                  {errors.password.message}
                </span>
              )) ||
              (errors.password?.type === "pattern" && (
                <span className="login__wrapper__error">
                  영어 대문자﹒소문자﹒숫자﹒특수문자!@#$%^&*+를 포함해주세요.
                </span>
              )) ||
              (errors.password?.type === "minLength" && (
                <span className="login__wrapper__error">
                  {errors.password.message}
                </span>
              )) ||
              (errors.password?.type === "maxLength" && (
                <span className="login__wrapper__error">
                  {errors.password.message}
                </span>
              ))
            ) : (
              <span className="login__wrapper__error login__wrapper__password">
                영어 대문자﹒소문자﹒숫자﹒특수문자!@#$%^&*+를 포함해주세요.
              </span>
            )}
            <input
              className="login__wrapper-input login__wrapper-input__login"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요!",
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+])[A-Za-z0-9!@#$%^&*+]{8,20}$/,
                minLength: {
                  value: 8,
                  message: "8자 이상 입력해주세요.",
                },
                maxLength: {
                  value: 20,
                  message: "최대 20자 입니다.",
                },
              })}
            ></input>

            <div className="login__input__title">
              <span>비밀번호 확인</span>
            </div>
            {errors.confirmPassword?.type === "required" && (
              <span className="login__wrapper__error">
                {errors.confirmPassword.message}
              </span>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <span className="login__wrapper__error">
                {errors.confirmPassword.message}
              </span>
            )}
            <input
              className="login__wrapper-input login__wrapper-input__login"
              type="password"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해주세요!",
                validate: {
                  checked: (value) =>
                    getValues("password") === value || "비밀번호가 다릅니다.",
                },
              })}
            ></input>

            <div className="login__input__title">
              <span>닉네임</span>
            </div>
            {errors.nickname?.type === "required" && (
              <span className="login__wrapper__error">
                {errors.nickname.message}
              </span>
            )}
            <input
              className="login__wrapper-input login__wrapper-input__login"
              type="text"
              placeholder="닉네임"
              {...register("nickname", { required: "닉네임을 입력해주세요!" })}
            ></input>

            <button className="login__wrapper-btn">회원가입</button>
          </form>
        </SignupForm>
      </SignupWrapper>
    </>
  );
};

export default SignUp;

const SignupWrapper = styled(FormWrapper)`
  margin-top: 4.375rem;
`;

const SignupForm = styled(FormDiv)`
  padding: 0;
  .login__input__title {
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  .login__wrapper-verification {
    margin-top: 0.5rem;
    margin-bottom: 1.125rem;

    background-color: ${(props) => (props.emailState ? "#E5E5EA" : "#E3F0FF")};
    cursor: pointer;
    pointer-events: ${(props) => (props.emailState ? "none" : "auto")};

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 0.3125rem;
    width: 100%;
    height: 2.5625rem;

    color: ${(props) => (props.emailState ? "#AEAEB2" : "#007aff")};
    font-size: 1rem;
    font-weight: 600;
  }
  .login__wrapper__error {
    font-weight: 400;
    font-size: 0.875rem;
    color: #ff3b30;
    margin-bottom: 0.5rem;
  }
  .login__wrapper__password {
    color: black;
    font-size: 0.8rem;
  }
`;
