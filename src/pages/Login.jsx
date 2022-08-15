import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../shared/api";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const navigate = useNavigate();

  const onSumbit = async (loginData) => {
    console.log("onSubmit");
    console.log(loginData);
    try {
      const getResponse = await userAuth.login(loginData);
      console.log(getResponse);
      navigate("/");
      return alert("로그인에 성공했습니다!");
    } catch (err) {
      console.log(err);
      return alert("서버와 통신에 실패했습니다.");
    }
  };
  const onError = (err) => {
    return console.log(err);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSumbit, onError)}>
        <input
          type="email"
          placeholder="이메일"
          {...register("email", {
            required: "이메일을 입력해주세요!",
            pattern: /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/,
          })}
        ></input>
        {errors.email?.type === "required" && (
          <span>{errors.email.message}</span>
        )}
        {errors.email?.type === "pattern" && (
          <span>형식에 맞게 메일 주소를 입력하세요.</span>
        )}
        <input
          type="password"
          placeholder="비밀번호"
          {...register("password", { required: "비밀번호를 입력해주세요!" })}
        ></input>
        {errors.password?.type === "required" && (
          <span>{errors.password.message}</span>
        )}
        <button>로그인</button>
      </form>
    </>
  );
};

export default Login;
