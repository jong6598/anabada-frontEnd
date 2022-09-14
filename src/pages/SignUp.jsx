import styled from "styled-components";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { userAuth } from "../shared/api";
import { FormWrapper, FormDiv, FormInput, FormBtn } from "./Login";
import { Cookies } from "react-cookie";

const SignUp = () => {
  //password type 변경용 state
  const [passwordType, setPasswordType] = useState({
    type: "password",
    visible: true,
  });
  const [passwordConfirmType, setPasswordConfirmType] = useState({
    type: "password",
    visible: true,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, dirtyFields },
  } = useForm({
    mode: "all",
  });
  const [emailState, setEmailState] = useState(false);
  const [nicknameState, setNicknameState] = useState(false);
  const { alertHandler } = useOutletContext();
  const cookies = new Cookies();

  const navigate = useNavigate();

  const onSumbit = (signupData) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const getResponse = (async () => await userAuth.signup(signupData))();
      return navigate("/signup/welcome");
    } catch (err) {
      console.log(err);
      return alertHandler("서버와 통신에 실패했습니다. 다시 시도해주세요.");
    }
  };
  const onError = (err) => {
    console.log(err);
    if (!emailState) {
      return alertHandler("이메일 중복확인을 해주세요.");
    }
    if (!nicknameState) {
      return alertHandler("닉네임 중복확인을 해주세요.");
    }
    return alertHandler("유효하지 않은 형식입니다. 다시 확인해주세요.");
  };
  // password
  const handlePasswordType = (e) => {
    setPasswordType((prev) => {
      if (prev.visible) {
        return { type: "text", visible: false };
      }
      return { type: "password", visible: true };
    });
  };
  // password confirm
  const handlePasswordConfirmType = (e) => {
    setPasswordConfirmType((prev) => {
      if (prev.visible) {
        return { type: "text", visible: false };
      }
      return { type: "password", visible: true };
    });
  };

  useEffect(() => {
    setEmailState(!dirtyFields.email);
    setNicknameState(!dirtyFields.nickname);
  }, [dirtyFields.email, dirtyFields.nickname]);

  const handleEmailValidation = async () => {
    if (errors.email.type === "pattern") {
      return alertHandler("올바른 이메일 형식이 아닙니다.");
    }
    try {
      const email = getValues("email");
      const response = await userAuth.emailValidation(email);
      if (response.status === 200) {
        dirtyFields.email = false;
        setEmailState(true);
        errors.email = null;
        return alertHandler("계속 진행해주세요!");
      }
      // 중복체크 실패했을 때
      if (response.response.status === 409) {
        return alertHandler("존재하는 이메일 입니다!");
      }
    } catch (err) {
      console.log(err);
      // 중복체크 실패했을 때
      if (err.response.status === 409) {
        return alertHandler("존재하는 이메일 입니다!");
      }
      // 이메일 형식이 아닐 때
      if (err.response.data === "올바른 형식의 이메일 주소여야 합니다") {
        return alertHandler(err.response.data);
      }
      return alertHandler("서버와 통신에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleNicknameValidation = async () => {
    try {
      const nickname = getValues("nickname");
      const response = await userAuth.nicknameValidation(nickname);
      if (response.status === 200) {
        dirtyFields.nickname = false;
        setNicknameState(true);
        errors.nickname = null;
        return alertHandler("계속 진행해주세요!");
      }
      // 중복체크 실패했을 때
      if (response.response.status === 409) {
        return alertHandler("존재하는 닉네임 입니다!");
      }
      // 공백 예외처리
      else if (response.response.data === "닉네임은 8자 이하로 설정해 주세요") {
        return alertHandler("닉네임은 8자 이하로 설정해 주세요");
      } else if (
        response.response.data === "닉네임에 빈 칸을 사용할 수 없습니다."
      ) {
        return alertHandler("닉네임에 빈 칸을 사용할 수 없습니다.");
      }
    } catch (err) {
      console.log(err);
      return alertHandler("서버와 통신에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 로그인한 상태에서 접근 시 차단
  useEffect(() => {
    if (localStorage.getItem("accessToken") && cookies.get("refreshToken")) {
      alertHandler("비정상적인 접근입니다.");
      return navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SignupWrapper>
        <SignupForm emailState={emailState} nicknameState={nicknameState}>
          <form
            className="login__wrapper-form"
            onSubmit={handleSubmit(onSumbit, onError)}
          >
            <InputName>
              <span>이메일</span>
            </InputName>
            {errors.email?.type === "required" && (
              <ErrorSpan>{errors.email.message}</ErrorSpan>
            )}
            {errors.email?.type === "pattern" && (
              <ErrorSpan>형식에 맞게 메일 주소를 입력하세요.</ErrorSpan>
            )}
            {errors.email?.type === "validate" && !emailState && (
              <ErrorSpan>{errors.email.message}</ErrorSpan>
            )}
            <FormInput
              errors={errors?.email}
              type="email"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요!",
                pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
                validate: () => emailState || "이메일 중복확인을 해주세요!",
              })}
            ></FormInput>
            <div
              className="login__wrapper-verification login__wrapper-email__verification"
              onClick={handleEmailValidation}
            >
              이메일 중복체크
            </div>
            <InputName>
              <span>비밀번호</span>
            </InputName>
            {errors.password ? (
              (errors.password?.type === "required" && (
                <ErrorSpan>{errors.password.message}</ErrorSpan>
              )) ||
              (errors.password?.type === "pattern" && (
                <ErrorSpan>
                  영어 대문자﹒소문자﹒숫자﹒특수문자!@#$%^&*+를 포함해주세요.
                </ErrorSpan>
              )) ||
              (errors.password?.type === "minLength" && (
                <ErrorSpan>{errors.password.message}</ErrorSpan>
              )) ||
              (errors.password?.type === "maxLength" && (
                <ErrorSpan>{errors.password.message}</ErrorSpan>
              ))
            ) : (
              <span className="login__wrapper__password">
                영어 대문자﹒소문자﹒숫자﹒특수문자!@#$%^&*+를 포함해주세요.
              </span>
            )}
            <PasswordBox>
              <FormInput
                errors={errors?.password}
                type={passwordType.type}
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
              ></FormInput>
              <PasswordEye onClick={handlePasswordType}>
                {passwordType.visible ? (
                  <span className="material-symbols-outlined">visibility</span>
                ) : (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                )}
              </PasswordEye>
            </PasswordBox>

            <InputName>
              <span>비밀번호 확인</span>
            </InputName>
            {errors.confirmPassword?.type === "required" && (
              <ErrorSpan>{errors.confirmPassword.message}</ErrorSpan>
            )}
            {errors.confirmPassword?.type === "validate" && (
              <ErrorSpan>{errors.confirmPassword.message}</ErrorSpan>
            )}
            <PasswordBox>
              <FormInput
                errors={errors.confirmPassword}
                type={passwordConfirmType.type}
                placeholder="비밀번호 확인"
                {...register("confirmPassword", {
                  required: "비밀번호 확인을 입력해주세요!",
                  validate: {
                    checked: (value) =>
                      getValues("password") === value || "비밀번호가 다릅니다.",
                  },
                })}
              ></FormInput>
              <PasswordEye onClick={handlePasswordConfirmType}>
                {passwordConfirmType.visible ? (
                  <span className="material-symbols-outlined">visibility</span>
                ) : (
                  <span className="material-symbols-outlined">
                    visibility_off
                  </span>
                )}
              </PasswordEye>
            </PasswordBox>
            <InputName>
              <span>닉네임</span>
            </InputName>
            {errors.nickname?.type === "required" && (
              <ErrorSpan>{errors.nickname.message}</ErrorSpan>
            )}
            {errors.nickname?.type === "validate" && (
              <ErrorSpan>{errors.nickname.message}</ErrorSpan>
            )}
            {errors.nickname?.type === "maxLength" && (
              <ErrorSpan>{errors.nickname.message}</ErrorSpan>
            )}
            <FormInput
              errors={errors?.nickname}
              type="text"
              placeholder="닉네임"
              {...register("nickname", {
                required: "닉네임을 입력해주세요!",
                validate: () => nicknameState || "닉네임 중복확인을 해주세요!",
                maxLength: {
                  value: 8,
                  message: "8글자 이하로 작성해주세요.",
                },
              })}
            ></FormInput>
            <div
              className="login__wrapper-verification login__wrapper-nickname__verification"
              onClick={handleNicknameValidation}
            >
              닉네임 중복체크
            </div>
            <FormBtn>회원가입</FormBtn>
          </form>
        </SignupForm>
      </SignupWrapper>
    </>
  );
};

export default SignUp;

const SignupWrapper = styled(FormWrapper)`
  margin-top: 4.375rem;
  display: flex;
  justify-content: center;
`;

const SignupForm = styled(FormDiv)`
  padding: 0;
  margin-top: 0.5rem;

  @media screen and (min-width: 1024px) {
    width: 23rem;
  }

  .login__wrapper-verification {
    margin-bottom: 1.125rem;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.3125rem;
    width: 100%;
    height: 2.5625rem;
    font-size: 1rem;
    font-weight: 600;
  }
  .login__wrapper-email__verification {
    background-color: ${(props) => (props.emailState ? "#E5E5EA" : "#E3F0FF")};
    pointer-events: ${(props) => (props.emailState ? "none" : "auto")};
    color: ${(props) => (props.emailState ? "#AEAEB2" : "#007aff")};
  }
  .login__wrapper-nickname__verification {
    background-color: ${(props) =>
      props.nicknameState ? "#E5E5EA" : "#E3F0FF"};
    pointer-events: ${(props) => (props.nicknameState ? "none" : "auto")};
    color: ${(props) => (props.nicknameState ? "#AEAEB2" : "#007aff")};
  }
  .login__wrapper__password {
    color: black;
    font-size: 0.75rem;
    margin-bottom: 0.5rem;
  }
`;

const InputName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const ErrorSpan = styled.span`
  font-weight: 400;
  font-size: 0.875rem;
  color: #ff3b30;
  margin-bottom: 0.5rem;
`;

const PasswordBox = styled.div`
  position: relative;
  input {
    width: 100%;
  }
`;

const PasswordEye = styled.div`
  position: absolute;
  right: 1rem;
  top: 20%;
  cursor: pointer;
`;
