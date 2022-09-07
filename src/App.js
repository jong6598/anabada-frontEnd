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
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "./shared/hooks/notificationHook";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import Notification from "./pages/Notification";
import { api } from "./shared/api";
import Chat from "./pages/Chat/Chat";
import ChatRoom from "./pages/Chat/ChatRoom";
import { userThunk } from "./redux/auth-slice";

function App() {
  const cookies = new Cookies();
  const getCookies = cookies.get("refreshToken");
  const dispatch = useDispatch();

  // 새로고침 시 유저정보 리덕스에 재설정
  useEffect(() => {
    // 로그인 한 유저가 아니면 유저정보를 요청하지 않음
    if (getCookies === undefined) {
      return;
    } else {
      // 로그인 한 유저가 유저이면 새로고침 시 유저정보를 요청함
      const getAccess = localStorage.getItem("accessToken");
      dispatch(userThunk(getAccess));
    }
  }, []);

  /* ::: notification 연결 관련 로직 ::: */
  // 헤더에 넣을 유저정보 받아오기
  const userInfo = useSelector((state) => state.auth);

  // 커스텀 훅 사용해서 알림 소켓 연결하기
  const { notifications, setNotifications } = useNotification(userInfo.userId);

  // 최초 로그인 시 refetch하면서 badge 여부 확인하기
  useEffect(() => {
    // 로그인을 했을 때 최초 쌓인 뱃지 요청하기(이후는 소캣 이용해서 업데이트 된다)
    if (getCookies !== undefined) {
      const accessToken = localStorage.getItem("accessToken");
      api
        .get(`/notifications`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((res) => {
          return setNotifications((prev) => {
            return {
              ...prev,
              isBadge: res.data?.badge,
            };
          });
        });
    }
  }, [getCookies]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Header notifications={notifications} />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/welcome" element={<Welcome />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/upload" element={<PostCU />} />
            <Route path="/posts/:postId/edit" element={<PostCU />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/meets" element={<Meets />} />
            <Route path="/meetAdd/:thunderPostId/edit" element={<AddMeet />} />
            <Route path="/meetAdd" element={<AddMeet />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mymeets" element={<MyMeets />} />
            <Route path="/myposts" element={<MyPosts />} />
            <Route path="/meetsAll" element={<MeetsAll />} />
          </Route>
          <Route path="/meets/:thunderPostId" element={<MeetDetail />} />
          <Route path="/posts/:postId" element={<PostsDetail />} />
          <Route path="/chat/:nickname" element={<Chat />} />
          <Route path="/room" element={<ChatRoom />} />
          <Route
            path="/notifications"
            element={<Notification setNotifications={setNotifications} />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
