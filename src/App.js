import "./App.css";
import { ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";
import theme from "./styles/theme";
import GlobalStyle from "./styles/global";
import Meets from "./pages/Meets";
import AddMeet from "./pages/MeetAdd";
import MeetDetail from "./pages/MeetDetail";
import Header from "./components/Header";
import MeetsAll from "./pages/MeetsAll";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import PostCU from "./pages/PostCU";
import PostsDetail from "./pages/PostsDetail";
import Posts from "./pages/Posts";
import Welcome from "./pages/Welcome";
import Mypage from "./pages/Mypage";
import MyPosts from "./pages/MyPosts";
import MyMeets from "./pages/MyMeets";
import { useSelector } from "react-redux";
import { useNotification } from "./shared/hooks/notificationHook";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "./shared/api";
import { Cookies } from "react-cookie";
import Notification from "./pages/Notification";

function App() {
  /* ::: notification 연결 관련 로직 ::: */
  // 헤더에 넣을 유저정보 받아오기
  const userInfo = useSelector((state) => state.auth);
  // 커스텀 훅 사용해서 알림 소켓 연결하기
  const { notifications, setNotifications } = useNotification(userInfo.userId);
  console.log("::: notifications :::", notifications);

  const cookies = new Cookies();
  const getCookies = cookies.get("refreshToken");
  // 최초 로그인 시 refetch하면서 badge 여부 확인하기
  useEffect(() => {
    // 로그인을 했을 때 최초 쌓인 뱃지 요청하기(이후는 소캣 이용해서 업데이트 된다)
    if (getCookies !== undefined) {
      api.get(`/notifications`).then((res) =>
        setNotifications((prev) => {
          return {
            ...prev,
            ...res.data.isBadge,
          };
        })
      );
    }
  }, [getCookies]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/welcome" element={<Welcome />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<PostsDetail />} />
            <Route path="/posts/upload" element={<PostCU />} />
            <Route path="/posts/:postId/edit" element={<PostCU />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/meets" element={<Meets />} />

            <Route path="/meetAdd" element={<AddMeet />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mymeets" element={<MyMeets />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/meetsAll" element={<MeetsAll />} />
          </Route>
          <Route path="/meets/:thunderPostId" element={<MeetDetail />} />
          <Route path="/notifications" element={<Notification />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
