import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}/api`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token"); // localStorage에 TOKEN 저장
  config.headers.common["Authorization"] = `${accessToken}`; // Header에 토큰을 넣어서 보내준다.
  return config;
});

// 로그인/회원가입용 axios(토큰 필요 X)
const userAxios = axios.create({
  baseURL: `http://43.200.6.110/api/users`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});
// 로그인/회원가입 요청 객체
export const userAuth = {
  login(loginData) {
    console.log(loginData);
    return userAxios.post("/login", loginData);
  },
  signup(signupData) {
    console.log(signupData);
    return userAxios.post("signup", signupData);
  },
  emailValidation(email) {
    return userAxios.get(`/${email}`);
  },
};

export const postsApi = {};
