import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_SERVER}/api`,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,'
  }
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('token'); // localStorage에 TOKEN 저장
  config.headers.common['Authorization'] = `${accessToken}`; // Header에 토큰을 넣어서 보내준다.
  return config;
});

export const postsApi = {};

export const meetsApi = {
  getMeetsPosts: (pageParam, area) =>
    api.get(`/meets?area=${area}&page=${pageParam}&size=5`),
  postMeetPost: (post) => api.post('/meets', post),
  editMeetPost: (post, thunderPostId) =>
    api.put(`/meets/${thunderPostId}`, post),
  deleteMeetPost: (thunderPostId) => api.delete(`/meets/${thunderPostId}`),
  getMeetDetail: (thunderPostId) => api.get(`/meets/${thunderPostId}`),
  postRequest: (thunderPostId) => api.post(`/meetlikes/${thunderPostId}`),
  deleteRequest: (thunderPostId) => api.delete(`/meetlikes/${thunderPostId}`),
  postLike: (thunderPostId) =>
    api.post(`/requests/${thunderPostId}
  `),
  deleteLike: (thunderPostId) => api.delete(`/requests/${thunderPostId}`)
};
