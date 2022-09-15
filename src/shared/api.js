import axios from "axios";
import { Cookies } from "react-cookie";

export const api = axios.create({
  baseURL: `https://${process.env.REACT_APP_API_SERVER}/api`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

// 로그인/회원가입용 axios(토큰 필요 X)
const userAxios = axios.create({
  baseURL: `https://${process.env.REACT_APP_API_SERVER}/api/users`,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("accessToken"); // localStorage에 TOKEN 저장
  config.headers.common["Authorization"] = `${accessToken}`; // Header에 토큰을 넣어서 보내준다.
  return config;
});

// 모든 요청에서 엑세스 토큰이 만료되었을 경우 예외처리
userAxios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    // 토큰 만료됐을 때 status
    if (status === 500) {
      // userAxios를 쓰는 경우인데 리프레시 토큰 조차 없는 경우
      const cookies = new Cookies();
      if (cookies.get("refreshToken")) {
        return err;
      }

      // 이전 작업에 대한 config저장
      const originalReq = config;
      // Bearer제거 작업
      const getRefresh = cookies.get("refreshToken").split(" ")[1];
      const getAccess = localStorage.getItem("accessToken").split(" ")[1];

      // refresh요청
      const response = await userAxios.post(
        "/reissue",
        {},
        {
          headers: {
            AccessToken: getAccess,
            RefreshToken: getRefresh,
          },
        }
      );
      const newAccess = response.headers.authorization;
      localStorage.setItem("accessToken", newAccess);
      // 새로 발급 받은 토큰으로 config 변경
      originalReq.headers.Authorization = newAccess;
      return axios(originalReq);
    }
    return err;
  }
);

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    // 토큰 만료됐을 때 status
    if (status === 500) {
      // userAxios를 쓰는 경우인데 리프레시 토큰 조차 없는 경우
      const cookies = new Cookies();
      if (cookies.get("refreshToken")) {
        return err;
      }

      // 이전 작업에 대한 config저장
      const originalReq = config;
      // Bearer제거 작업
      const getRefresh = cookies.get("refreshToken").split(" ")[1];
      const getAccess = localStorage.getItem("accessToken").split(" ")[1];

      // refresh요청
      const response = await userAxios.post(
        "/reissue",
        {},
        {
          headers: {
            AccessToken: getAccess,
            RefreshToken: getRefresh,
          },
        }
      );
      const newAccess = response.headers.authorization;
      localStorage.setItem("accessToken", newAccess);
      // 새로 발급 받은 토큰으로 config 변경
      originalReq.headers.Authorization = newAccess;
      return axios(originalReq);
    }
    return err;
  }
);

// 로그인/회원가입 요청 객체
export const userAuth = {
  login(loginData) {
    return userAxios.post("/login", loginData);
  },
  signup(signupData) {
    return userAxios.post("/signup", signupData);
  },
  emailValidation(email) {
    return userAxios.post(`/validation/email`, {
      email,
    });
  },
  nicknameValidation(nickname) {
    return userAxios.post(`/validation/nickname`, {
      nickname,
    });
  },
  useAccess(token) {
    // 유저정보 받아오기
    return userAxios.get(`/info`, {
      headers: {
        Authorization: token,
      },
    });
  },
};

// 모임
export const meetsApi = {
  getPopularPosts: (area) => api.get(`/meets/hot?area=${area}`),

  getMeetsPosts: (pageParam, area) =>
    api.get(`/meets?area=${area}&page=${pageParam}&size=5`),

  getSearchPosts: (pageParam, area, keyword) =>
    api.get(
      `/meets/search?area=${area}&keyword=${keyword}&page=${pageParam}&size=10`
    ),

  postMeetPost: (post) => api.post("/meets", post),

  editMeetPost: (thunderPostId, post) =>
    api.put(`/meets/${thunderPostId}`, post),

  deleteMeetPost: (thunderPostId) => api.delete(`/meets/${thunderPostId}`),

  getMeetDetail: (thunderPostId) => api.get(`/meets/${thunderPostId}`),

  postLike: (thunderPostId) => api.post(`/meetlikes/${thunderPostId}`),
  deleteLike: (thunderPostId) => api.delete(`/meetlikes/${thunderPostId}`),

  postRequest: (thunderPostId) =>
    api.post(`/requests/${thunderPostId}
  `),

  deleteRequest: (thunderPostId) => api.delete(`/requests/${thunderPostId}`),
};

// 게시글
export const postApi = {
  uploadImages(file) {
    return api.post("/posts/images", file);
  },

  deleteImages(images) {
    return api.delete("/images", images);
  },
  getPosts(pageParam, areaSelected) {
    return api.get(`/posts?area=${areaSelected}&page=${pageParam}&size=6`);
  },
  getSearchPosts(pageParam, areaSelected, keyword) {
    return api.get(
      `/posts/search?area=${areaSelected}&keyword=${keyword}&page=${pageParam}&size=6`
    );
  },
  getPostDetail(postId) {
    return api.get(`/posts/${postId}`);
  },
  getComments(pageParam, postId) {
    return api.get(`comments/${postId}?page=${pageParam}&size=5`);
  },

  newPost(newPost) {
    return api.post(`/posts`, newPost);
  },
  updatePost(postId, newPost) {
    return api.put(`/posts/${postId}`, newPost);
  },

  deletePost(postId) {
    return api.delete(`/posts/${postId}`);
  },

  postLike(postId) {
    return api.post(`/likes/${postId}`);
  },
  deleteLike(postId) {
    return api.delete(`/likes/${postId}`);
  },

  newComments(postId, content) {
    return api.post(`/comments/${postId}`, content);
  },
  updateComments(commentId, updateContent) {
    return api.put(`/comments/${commentId}`, updateContent);
  },
  deleteComments(commentId) {
    return api.delete(`/comments/${commentId}`);
  },
};

// 채팅
export const chatApi = {
  createChat(receiver) {
    return api.post(`/rooms?receiver=${receiver}`);
  },
  deleteChat(roomId) {
    return api.delete(`/rooms/${roomId}`);
  },
  getMessages(pageParam, roomId) {
    return api.get(`messages/${roomId}?page=${pageParam}&size=20`);
  },
  getAllRooms(pageParam) {
    return api.get(`/rooms?page=${pageParam}&size=10`);
  },
};

// 마이페이지
export const myApi = {
  getMyPosts(filter, pageParam) {
    return api.get(`myposts?filter=${filter}&page=${pageParam}&size=6`);
  },
  getMyMeets(filter, pageParam) {
    return api.get(`mymeets?filter=${filter}&page=${pageParam}&size=6`);
  },
  uploadProfile(profileImg) {
    return api.put("/profileimages", profileImg);
  },
};
