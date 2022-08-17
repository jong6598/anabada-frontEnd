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


export const postApi = {
  deleteImages(images) {
    return api.delete('/images', images)
  },
  getPosts(pageParam, areaSelected){
    return api.get (`/posts?area=${areaSelected}&page=${pageParam}&size=6`)
  },
  getPost(postId){
    return api.get(`/posts/${postId}`)
  },
  postLike(postId){
    return api.post(`/likes/${postId}`)
  },
  deleteLike(postId){
    return api.delete(`/likes/${postId}`)
  },
  deletecomments(commentId){
    return api.delete(`/comments/${commentId}`)
  },


};


