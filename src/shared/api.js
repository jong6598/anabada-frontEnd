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
  getMeetsPosts: (pageParam) => api.get(`/meets?&page=${pageParam}&limit=5`),
  postMeetPost: (post) => api.post('/meets', post),
  editMeetPost: (post, meetId) => api.put(`/meets/${meetId}`, post),
  deleteMeetPost: (meetId) => api.delete(`/meets/${meetId}`),
  getMeetDetail: (meetId) => api.get(`/meets/${meetId}`)
};
