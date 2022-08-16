import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../shared/api";
import { Cookies } from "react-cookie";

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
    return alert("유효하지 않은 형식입니다. 다시 확인해주세요.");
  };

  // 최초mount 시에는 작동이 안되도록!
  const mountRef = useRef(null);
  useEffect(() => {
    if (mountRef.current === null) {
      mountRef.current = true;
      return;
    }
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
      if (err.response.status === 409) {
        return alert("존재하는 이메일 입니다!");
      }
      return alert("서버와 통신에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 로그인한 상태에서 접근 시 차단
  const cookies = new Cookies();
  useEffect(() => {
    if (cookies.get("refreshToken")) {
      alert("비정상적인 접근입니다.");
      return navigate("/");
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSumbit, onError)}>
        <input
          type="email"
          placeholder="이메일"
          {...register("email", {
            required: "이메일을 입력해주세요!",
            pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
            validate: () => emailState || "중복확인을 해주세요!",
          })}
        ></input>
        <EmailValidationBtn
          emailState={emailState}
          onClick={handleEmailValidation}
        >
          중복체크
        </EmailValidationBtn>
        {errors.email?.type === "required" && (
          <span>{errors.email.message}</span>
        )}
        {errors.email?.type === "pattern" && (
          <span>형식에 맞게 메일 주소를 입력하세요.</span>
        )}
        {errors.email?.type === "validate" && (
          <span>이메일 중복확인을 해주세요.</span>
        )}
        <input
          type="text"
          placeholder="닉네임"
          {...register("nickname", { required: "닉네임을 입력해주세요!" })}
        ></input>
        {errors.nickname?.type === "required" && (
          <span>{errors.nickname.message}</span>
        )}
        <input
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
        {errors.password?.type === "required" && (
          <span>{errors.password.message}</span>
        )}
        {errors.password?.type === "pattern" && (
          <span>
            "영어 대문자﹒소문자﹒숫자﹒특수문자!@#$%^&*+를 포함해주세요"
          </span>
        )}
        {errors.password?.type === "minLength" && (
          <span>{errors.password.message}</span>
        )}
        {errors.password?.type === "maxLength" && (
          <span>{errors.password.message}</span>
        )}
        <input
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
        {errors.confirmPassword?.type === "required" && (
          <span>{errors.confirmPassword.message}</span>
        )}
        {errors.confirmPassword?.type === "validate" && (
          <span>{errors.confirmPassword.message}</span>
        )}
        <button>회원가입</button>
      </form>
    </>
  );
};

export default SignUp;

const EmailValidationBtn = styled.div`
  cursor: pointer;
  pointer-events: ${(props) => (props.emailState ? "none" : "auto")};
  background-color: ${(props) => (props.emailState ? "gray" : "blue")};
`;
